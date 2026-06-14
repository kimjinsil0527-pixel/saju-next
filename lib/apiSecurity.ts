import 'server-only'

import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

type RateLimitRpcRow = {
  allowed: boolean
  remaining: number
  retry_after: number
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
  }
}

function firstForwardedAddress(value: string | null) {
  return value?.split(',')[0]?.trim() || null
}

function getClientAddress(req: NextRequest) {
  return (
    firstForwardedAddress(req.headers.get('x-vercel-forwarded-for')) ??
    firstForwardedAddress(req.headers.get('x-forwarded-for')) ??
    req.headers.get('x-real-ip')?.trim() ??
    'unknown'
  )
}

function getRateLimitSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not configured.')
  return secret
}

function hashSubject(scope: string, subject: string) {
  return crypto
    .createHmac('sha256', getRateLimitSecret())
    .update(`${scope}|${subject}`)
    .digest('hex')
}

export async function enforceRateLimit(params: {
  req: NextRequest
  scope: string
  limit: number
  windowSeconds: number
  userId?: string | null
}) {
  const { req, scope, limit, windowSeconds, userId } = params
  const subject = userId
    ? `user:${userId}`
    : `ip:${getClientAddress(req)}`
  const sb = createServiceClient()
  const { data, error } = await sb.rpc('consume_api_rate_limit', {
    p_scope: scope,
    p_subject_hash: hashSubject(scope, subject),
    p_limit: limit,
    p_window_seconds: windowSeconds,
  })

  if (error) throw error

  const result = (Array.isArray(data) ? data[0] : null) as RateLimitRpcRow | null
  if (!result) throw new Error('Rate limit result was not returned.')

  return {
    allowed: Boolean(result.allowed),
    remaining: Number(result.remaining ?? 0),
    retryAfter: Math.max(1, Number(result.retry_after ?? windowSeconds)),
  }
}

export function rateLimitResponse(retryAfter: number) {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'Retry-After': String(retryAfter),
      },
    },
  )
}

export async function readJsonBody<T>(
  req: NextRequest,
  maxBytes = 2048,
): Promise<T> {
  const contentType = req.headers.get('content-type')?.toLowerCase() ?? ''
  if (!contentType.startsWith('application/json')) {
    throw new ApiRequestError('Content-Type must be application/json.', 415)
  }

  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new ApiRequestError('Request body is too large.', 413)
  }

  const rawBody = await req.text()
  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    throw new ApiRequestError('Request body is too large.', 413)
  }

  try {
    return JSON.parse(rawBody) as T
  } catch {
    throw new ApiRequestError('Invalid JSON body.', 400)
  }
}

export function apiRequestErrorResponse(error: unknown) {
  if (!(error instanceof ApiRequestError)) return null

  return NextResponse.json(
    { error: error.message },
    {
      status: error.status,
      headers: { 'Cache-Control': 'no-store' },
    },
  )
}

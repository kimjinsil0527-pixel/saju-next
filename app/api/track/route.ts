import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import {
  apiRequestErrorResponse,
  enforceRateLimit,
  rateLimitResponse,
  readJsonBody,
} from '@/lib/apiSecurity'

const ALLOWED_PATH_RE = /^\/[a-zA-Z0-9\-_/]*$/  // only safe URL characters
const MAX_PATH_LEN = 200

function safeReferrer(value: string | null) {
  if (!value) return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null

    return `${url.origin}${url.pathname}`.slice(0, 500)
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit({
      req,
      scope: 'page-track',
      limit: 30,
      windowSeconds: 60,
    })
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.retryAfter)

    const body = await readJsonBody<unknown>(req, 1024)
    const path =
      body && typeof body === 'object' && !Array.isArray(body)
        ? (body as Record<string, unknown>).path
        : null

    // Validate path before storing
    if (
      !path ||
      typeof path !== 'string' ||
      path.length > MAX_PATH_LEN ||
      !ALLOWED_PATH_RE.test(path)
    ) {
      return NextResponse.json({ ok: false })
    }

    const referrer = safeReferrer(req.headers.get('referer'))
    const userAgent = req.headers.get('user-agent') ?? null

    const sb = createServiceClient()
    await sb.from('page_views').insert({
      path,
      referrer,
      user_agent: userAgent ? userAgent.slice(0, 300) : null,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const requestError = apiRequestErrorResponse(error)
    if (requestError) return requestError
    return NextResponse.json({ ok: false })
  }
}

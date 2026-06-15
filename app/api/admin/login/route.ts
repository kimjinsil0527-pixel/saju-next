import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import {
  apiRequestErrorResponse,
  enforceRateLimit,
  rateLimitResponse,
  readJsonBody,
} from '@/lib/apiSecurity'
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminSession,
} from '@/lib/adminAuth'

function safeEqual(value: string, expected: string) {
  const actualBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)
  return (
    actualBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  )
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit({
      req,
      scope: 'admin-login',
      limit: 5,
      windowSeconds: 15 * 60,
    })
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.retryAfter)

    const body = await readJsonBody<unknown>(req, 1024)
    const password =
      body && typeof body === 'object' && !Array.isArray(body)
        ? (body as Record<string, unknown>).password
        : null

    if (typeof password !== 'string' || !password || password.length > 256) {
      return NextResponse.json(
        { error: '비밀번호를 입력해주세요.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword || !process.env.AUTH_SECRET) {
      console.error('admin authentication configuration is missing')
      return NextResponse.json(
        { error: '관리자 로그인을 사용할 수 없습니다.' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    if (!safeEqual(password, adminPassword)) {
      return NextResponse.json(
        { error: '비밀번호가 틀렸습니다.' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const response = NextResponse.json(
      { ok: true },
      { headers: { 'Cache-Control': 'no-store' } },
    )
    response.cookies.set(
      ADMIN_COOKIE_NAME,
      createAdminSession(),
      adminCookieOptions(),
    )
    return response
  } catch (error) {
    const requestError = apiRequestErrorResponse(error)
    if (requestError) return requestError

    console.error('admin login security error:', error)
    return NextResponse.json(
      { error: '관리자 로그인을 처리할 수 없습니다.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Map: ip → { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000  // 1 minute
const RATE_LIMIT_MAX = 60            // 60 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX) return true
  return false
}

// Cleanup stale entries periodically (runs on each request, cheap O(1) amortized)
let lastCleanup = Date.now()
function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup < 120_000) return  // clean every 2 minutes at most
  lastCleanup = now
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key)
  }
}

// ── Middleware ────────────────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/login은 보호 제외
  if (pathname === '/admin/login') return NextResponse.next()

  // /admin 하위 경로 보호
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value
    const validToken = process.env.AUTH_SECRET

    // Timing-safe comparison to prevent timing attacks (Edge Runtime compatible)
    function timingSafeEqual(a: string, b: string): boolean {
      if (a.length !== b.length) return false
      let diff = 0
      for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
      }
      return diff === 0
    }
    const isValid = !!(token && validToken && timingSafeEqual(token, validToken))

    if (!isValid) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // API Rate Limiting
  if (pathname.startsWith('/api/')) {
    maybeCleanup()
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}

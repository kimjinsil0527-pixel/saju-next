import { NextRequest, NextResponse } from 'next/server'

// ── Brute-force protection ────────────────────────────────────────────────────
// Map: ip → { attempts, lockedUntil }
const loginAttempts = new Map<string, { attempts: number; lockedUntil: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000  // 15 minutes

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function checkBruteForce(ip: string): { blocked: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (entry && now < entry.lockedUntil) {
    return { blocked: true, retryAfterSeconds: Math.ceil((entry.lockedUntil - now) / 1000) }
  }

  return { blocked: false }
}

function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const entry = loginAttempts.get(ip)

  if (!entry || now >= entry.lockedUntil) {
    loginAttempts.set(ip, { attempts: 1, lockedUntil: 0 })
  } else {
    entry.attempts++
    if (entry.attempts >= MAX_ATTEMPTS) {
      entry.lockedUntil = now + LOCKOUT_MS
    }
  }
}

function clearAttempts(ip: string) {
  loginAttempts.delete(ip)
}

// ── Route ─────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  // Check lockout before even reading the body
  const { blocked, retryAfterSeconds } = checkBruteForce(ip)
  if (blocked) {
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${Math.ceil(retryAfterSeconds! / 60)} minutes.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    )
  }

  let password: string
  try {
    const body = await req.json()
    password = body?.password
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    recordFailedAttempt(ip)
    // Return same generic message regardless of reason to avoid enumeration
    return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 })
  }

  // Success — clear attempts, set cookie
  clearAttempts(ip)

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', process.env.AUTH_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  })
  return res
}

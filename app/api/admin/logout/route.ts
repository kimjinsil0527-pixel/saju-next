import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, adminCookieOptions } from '@/lib/adminAuth'

export async function POST() {
  const res = NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } },
  )
  res.cookies.set(ADMIN_COOKIE_NAME, '', {
    ...adminCookieOptions(),
    maxAge: 0,
  })
  return res
}

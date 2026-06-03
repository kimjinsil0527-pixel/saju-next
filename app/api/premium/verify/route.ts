import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import {
  createPremiumAccessToken,
  getPremiumAccessCookieName,
  getPremiumAccessMaxAge,
  normalizePremiumEmail,
} from '@/lib/premiumAccess'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    const normalizedEmail = normalizePremiumEmail(String(email ?? ''))

    if (!EMAIL_RE.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid purchase email.' }, { status: 400 })
    }

    const sb = createServiceClient()
    const { data, error } = await sb
      .from('payments')
      .select('id')
      .eq('status', 'done')
      .ilike('customer_email', normalizedEmail)
      .limit(1)

    if (error) {
      console.error('premium verify db error:', error)
      return NextResponse.json({ error: 'Could not verify premium access.' }, { status: 500 })
    }

    if (!data?.length) {
      return NextResponse.json({ error: 'No completed payment was found for this email.' }, { status: 404 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(getPremiumAccessCookieName(), createPremiumAccessToken(normalizedEmail), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: getPremiumAccessMaxAge(),
    })
    return res
  } catch (err) {
    console.error('premium verify error:', err)
    return NextResponse.json({ error: 'A server error occurred.' }, { status: 500 })
  }
}

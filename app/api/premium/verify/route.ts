import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { syncCompletedPaymentCookieGrants } from '@/lib/cookieWallet'
import {
  enforceRateLimit,
  rateLimitResponse,
} from '@/lib/apiSecurity'

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    if (!user?.email || !user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Sign in with your confirmed purchase email first.' },
        { status: 401 },
      )
    }

    const rateLimit = await enforceRateLimit({
      req,
      scope: 'premium-verify',
      limit: 10,
      windowSeconds: 60,
      userId: user.id,
    })
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.retryAfter)

    const wallet = await syncCompletedPaymentCookieGrants(user)
    if (!wallet.hasPaidPlan) {
      return NextResponse.json(
        { error: 'No completed membership payment was found for this account email.' },
        { status: 404 },
      )
    }

    return NextResponse.json({ ok: true, balance: wallet.balance })
  } catch (error) {
    console.error('premium account link error:', error)
    return NextResponse.json(
      { error: 'Could not verify Premium access.' },
      { status: 500 },
    )
  }
}

import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { hasPremiumEntitlement } from '@/lib/premiumEntitlement'

export async function POST() {
  try {
    const user = await getAuthenticatedUser()

    if (!user?.email || !user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Sign in with your confirmed purchase email first.' },
        { status: 401 },
      )
    }

    const entitled = await hasPremiumEntitlement(user)
    if (!entitled) {
      return NextResponse.json(
        { error: 'No completed Premium payment was found for this account email.' },
        { status: 404 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('premium account link error:', error)
    return NextResponse.json(
      { error: 'Could not verify Premium access.' },
      { status: 500 },
    )
  }
}

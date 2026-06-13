import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { createPaymentAccountSignature } from '@/lib/paymentAccount'
import { syncCompletedPaymentCookieGrants } from '@/lib/cookieWallet'

export async function GET() {
  const user = await getAuthenticatedUser()

  if (!user?.id || !user.email || !user.email_confirmed_at) {
    return NextResponse.json(
      { signedIn: false },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const email = user.email.trim().toLowerCase()
  const wallet = await syncCompletedPaymentCookieGrants(user)

  return NextResponse.json(
    {
      signedIn: true,
      email,
      accountId: user.id,
      accountSignature: createPaymentAccountSignature(user.id, email),
      hasMembership: wallet.hasPaidPlan,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

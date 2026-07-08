import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { createPaymentAccountSignature } from '@/lib/paymentAccount'
import { syncCompletedPaymentCookieGrants } from '@/lib/cookieWallet'
import { getPaymentProduct } from '@/lib/paymentProductCatalog'
import {
  hasConfiguredCreemProduct,
  hasCreemApiKey,
} from '@/lib/creemProducts'
import {
  enforceRateLimit,
  rateLimitResponse,
} from '@/lib/apiSecurity'

export async function GET(req: NextRequest) {
  const product = getPaymentProduct(req.nextUrl.searchParams.get('plan') ?? 'premium')
  if (!product) {
    return NextResponse.json(
      { error: 'Unsupported product.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const user = await getAuthenticatedUser()
  const rateLimit = await enforceRateLimit({
    req,
    scope: 'checkout-account',
    limit: user?.id ? 30 : 12,
    windowSeconds: 60,
    userId: user?.id,
  })
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit.retryAfter)

  if (!user?.id || !user.email || !user.email_confirmed_at) {
    return NextResponse.json(
      { signedIn: false },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const email = user.email.trim().toLowerCase()
  const wallet = await syncCompletedPaymentCookieGrants(user)
  const productConfigured = Boolean(
    hasCreemApiKey() && hasConfiguredCreemProduct(product.key),
  )

  return NextResponse.json(
    {
      signedIn: true,
      email,
      accountId: user.id,
      accountSignature: createPaymentAccountSignature(user.id, email),
      hasMembership: wallet.hasPaidPlan,
      productConfigured,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

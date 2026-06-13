import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { createPaymentAccountSignature } from '@/lib/paymentAccount'
import { syncCompletedPaymentCookieGrants } from '@/lib/cookieWallet'
import { getPaymentProduct } from '@/lib/paymentProductCatalog'
import {
  getLemonCheckoutUrl,
  hasConfiguredVariant,
} from '@/lib/lemonSqueezyProducts'

export async function GET(req: NextRequest) {
  const product = getPaymentProduct(req.nextUrl.searchParams.get('plan') ?? 'premium')
  if (!product) {
    return NextResponse.json(
      { error: 'Unsupported product.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const user = await getAuthenticatedUser()

  if (!user?.id || !user.email || !user.email_confirmed_at) {
    return NextResponse.json(
      { signedIn: false },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const email = user.email.trim().toLowerCase()
  const wallet = await syncCompletedPaymentCookieGrants(user)
  const checkoutUrl = getLemonCheckoutUrl(product.key)
  const productConfigured = Boolean(
    checkoutUrl && hasConfiguredVariant(product.key),
  )

  return NextResponse.json(
    {
      signedIn: true,
      email,
      accountId: user.id,
      accountSignature: createPaymentAccountSignature(user.id, email),
      hasMembership: wallet.hasPaidPlan,
      checkoutUrl: productConfigured ? checkoutUrl : null,
      productConfigured,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { createPaymentAccountSignature } from '@/lib/paymentAccount'
import { getPaymentProduct } from '@/lib/paymentProductCatalog'
import { createCreemCheckout } from '@/lib/creemProducts'
import {
  enforceRateLimit,
  rateLimitResponse,
} from '@/lib/apiSecurity'

type CheckoutRequest = {
  plan?: unknown
  name?: unknown
}

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser()
  const rateLimit = await enforceRateLimit({
    req,
    scope: 'payment-create',
    limit: user?.id ? 10 : 4,
    windowSeconds: 60,
    userId: user?.id,
  })
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit.retryAfter)

  if (!user?.id || !user.email || !user.email_confirmed_at) {
    return NextResponse.json(
      { error: 'Sign in with a confirmed email before checkout.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  let body: CheckoutRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid checkout request.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const product = getPaymentProduct(
    typeof body.plan === 'string' ? body.plan : 'premium',
  )
  const name = typeof body.name === 'string' ? body.name.trim() : ''

  if (!product) {
    return NextResponse.json(
      { error: 'Unsupported product.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  if (name.length < 1 || name.length > 100) {
    return NextResponse.json(
      { error: 'Enter a valid name for checkout.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  try {
    const checkout = await createCreemCheckout({
      product,
      userId: user.id,
      email: user.email,
      name,
      accountSignature: createPaymentAccountSignature(user.id, user.email),
    })

    return NextResponse.json(
      { checkoutUrl: checkout.checkoutUrl },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (error) {
    console.error('creem checkout create error:', error)
    return NextResponse.json(
      { error: 'Could not create checkout.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}

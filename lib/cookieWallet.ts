import type { User } from '@supabase/supabase-js'
import { createServiceClient } from '@/lib/supabase'
import {
  getPaymentProduct,
  PAYMENT_PRODUCT_KEYS,
  type PaymentProduct,
} from '@/lib/paymentProductCatalog'
import {
  getSubscriptionMembership,
  hasLiveManageableSubscription,
  syncProfileMembership,
} from '@/lib/subscriptionAccess'

type WalletRpcRow = {
  balance: number
  applied?: boolean
  unlocked?: boolean
  charged?: boolean
}

function firstRow(data: unknown): WalletRpcRow | null {
  if (!Array.isArray(data) || !data.length) return null
  return data[0] as WalletRpcRow
}

export async function ensureUserProfile(user: User) {
  if (!user.id) throw new Error('Authenticated user ID is required.')

  const sb = createServiceClient()
  const { error } = await sb.from('profiles').upsert(
    {
      id: user.id,
      email: user.email?.trim().toLowerCase() ?? null,
    },
    { onConflict: 'id' },
  )

  if (error) throw error
}

export async function grantCookiesForPayment(
  userId: string,
  reference: string,
  product: PaymentProduct,
) {
  if (!reference.trim()) throw new Error('Payment reference is required.')

  const grantType =
    product.kind === 'subscription' ? 'monthly-cookies' : 'cookie-pack-cookies'
  const sb = createServiceClient()
  const { data, error } = await sb.rpc('grant_cookies', {
    p_user_id: userId,
    p_amount: product.cookies,
    p_idempotency_key: `payment-ref:${reference}:${grantType}`,
    p_kind: product.kind === 'subscription' ? 'subscription_payment' : 'cookie_pack_purchase',
    p_reference: reference,
    p_metadata: {
      cookies: product.cookies,
      product_key: product.key,
      product_kind: product.kind,
    },
  })

  if (error) throw error
  return firstRow(data)
}

export async function syncCompletedPaymentCookieGrants(user: User) {
  if (!user.id || !user.email || !user.email_confirmed_at) {
    return {
      balance: 0,
      hasPaidPlan: false,
      canManageMembership: false,
    }
  }

  await ensureUserProfile(user)
  const sb = createServiceClient()
  const normalizedEmail = user.email.trim().toLowerCase()

  const { data: legacyPayments, error: legacyError } = await sb
    .from('payments')
    .select('id, plan')
    .is('user_id', null)
    .ilike('customer_email', normalizedEmail)
    .in('plan', [...PAYMENT_PRODUCT_KEYS, 'Premium', 'default', 'Default'])
    .eq('status', 'done')

  if (legacyError) throw legacyError

  if (legacyPayments?.length) {
    const { error: linkError } = await sb
      .from('payments')
      .update({ user_id: user.id })
      .in('id', legacyPayments.map(payment => payment.id))

    if (linkError) throw linkError

    const legacyPlanIds = legacyPayments
      .filter(payment => !getPaymentProduct(payment.plan))
      .map(payment => payment.id)

    if (legacyPlanIds.length) {
      const { error: normalizeError } = await sb
        .from('payments')
        .update({ plan: 'premium' })
        .in('id', legacyPlanIds)

      if (normalizeError) throw normalizeError
    }
  }

  const { error: subscriptionLinkError } = await sb
    .from('subscriptions')
    .update({ user_id: user.id })
    .is('user_id', null)
    .ilike('customer_email', normalizedEmail)

  if (subscriptionLinkError) throw subscriptionLinkError

  const { data: payments, error: paymentsError } = await sb
    .from('payments')
    .select('order_id, plan')
    .eq('user_id', user.id)
    .in('plan', PAYMENT_PRODUCT_KEYS)
    .eq('status', 'done')

  if (paymentsError) throw paymentsError

  for (const payment of payments ?? []) {
    const product = getPaymentProduct(payment.plan)
    if (product) {
      await grantCookiesForPayment(user.id, payment.order_id, product)
    }
  }

  const { data: profile, error: profileError } = await sb
    .from('profiles')
    .select('cookie_balance')
    .eq('id', user.id)
    .single()

  if (profileError) throw profileError

  const subscriptionMembership = await getSubscriptionMembership(sb, user.id)
  const hasPaidPlan =
    subscriptionMembership ??
    Boolean(payments?.some(payment => payment.plan === 'premium'))

  if (subscriptionMembership !== null) {
    await syncProfileMembership(sb, user.id)
  } else {
    const { error: legacyPlanError } = await sb
      .from('profiles')
      .update({
        plan: hasPaidPlan ? 'premium' : 'free',
        plan_expires_at: null,
      })
      .eq('id', user.id)

    if (legacyPlanError) throw legacyPlanError
  }

  return {
    balance: Number(profile.cookie_balance ?? 0),
    hasPaidPlan,
    canManageMembership:
      subscriptionMembership !== null
        ? await hasLiveManageableSubscription(sb, user.id)
        : false,
  }
}

export async function hasReadingUnlock(
  userId: string,
  productKey: string,
  readingKey: string,
) {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('reading_unlocks')
    .select('id')
    .eq('user_id', userId)
    .eq('product_key', productKey)
    .eq('reading_key', readingKey)
    .maybeSingle()

  if (error) throw error
  return Boolean(data)
}

export async function consumeReadingCookies(
  userId: string,
  productKey: string,
  readingKey: string,
  cost: number,
) {
  const sb = createServiceClient()
  const { data, error } = await sb.rpc('consume_reading_cookies', {
    p_user_id: userId,
    p_product_key: productKey,
    p_reading_key: readingKey,
    p_cost: cost,
  })

  if (error) throw error
  return firstRow(data)
}

import type { User } from '@supabase/supabase-js'
import { createServiceClient } from '@/lib/supabase'

export const MONTHLY_COOKIE_GRANT = 35

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
) {
  if (!reference.trim()) throw new Error('Payment reference is required.')

  const sb = createServiceClient()
  const { data, error } = await sb.rpc('grant_cookies', {
    p_user_id: userId,
    p_amount: MONTHLY_COOKIE_GRANT,
    p_idempotency_key: `payment-ref:${reference}:monthly-cookies`,
    p_kind: 'subscription_payment',
    p_reference: reference,
    p_metadata: { cookies: MONTHLY_COOKIE_GRANT },
  })

  if (error) throw error
  return firstRow(data)
}

export async function syncCompletedPaymentCookieGrants(user: User) {
  if (!user.id || !user.email || !user.email_confirmed_at) {
    return { balance: 0, hasPaidPlan: false }
  }

  await ensureUserProfile(user)
  const sb = createServiceClient()
  const normalizedEmail = user.email.trim().toLowerCase()

  const { data: legacyPayments, error: legacyError } = await sb
    .from('payments')
    .select('id')
    .is('user_id', null)
    .ilike('customer_email', normalizedEmail)
    .in('plan', ['premium', 'Premium', 'default', 'Default'])
    .eq('status', 'done')

  if (legacyError) throw legacyError

  if (legacyPayments?.length) {
    const { error: linkError } = await sb
      .from('payments')
      .update({ user_id: user.id, plan: 'premium' })
      .in('id', legacyPayments.map(payment => payment.id))

    if (linkError) throw linkError
  }

  const { data: payments, error: paymentsError } = await sb
    .from('payments')
    .select('order_id')
    .eq('user_id', user.id)
    .in('plan', ['premium', 'Premium', 'default', 'Default'])
    .eq('status', 'done')

  if (paymentsError) throw paymentsError

  for (const payment of payments ?? []) {
    await grantCookiesForPayment(user.id, payment.order_id)
  }

  const { data: profile, error: profileError } = await sb
    .from('profiles')
    .select('cookie_balance')
    .eq('id', user.id)
    .single()

  if (profileError) throw profileError

  return {
    balance: Number(profile.cookie_balance ?? 0),
    hasPaidPlan: Boolean(payments?.length),
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

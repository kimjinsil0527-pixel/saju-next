import type { SupabaseClient } from '@supabase/supabase-js'

type SubscriptionAccessRow = {
  status: string
  ends_at: string | null
}

type SubscriptionPortalRow = SubscriptionAccessRow & {
  test_mode: boolean
}

const ACTIVE_STATUSES = new Set([
  'active',
  'on_trial',
  'paused',
  'past_due',
])

export function subscriptionGrantsAccess(
  subscription: SubscriptionAccessRow,
  now = new Date(),
) {
  const status = subscription.status.trim().toLowerCase()

  if (ACTIVE_STATUSES.has(status)) return true

  if (status === 'cancelled' && subscription.ends_at) {
    const endsAt = new Date(subscription.ends_at)
    return !Number.isNaN(endsAt.getTime()) && endsAt.getTime() > now.getTime()
  }

  return false
}

export async function getSubscriptionMembership(
  sb: SupabaseClient,
  userId: string,
) {
  const { data, error } = await sb
    .from('subscriptions')
    .select('status, ends_at')
    .eq('user_id', userId)

  if (error) throw error
  if (!data?.length) return null

  return data.some(subscription => subscriptionGrantsAccess(subscription))
}

export async function hasLiveManageableSubscription(
  sb: SupabaseClient,
  userId: string,
) {
  const { data, error } = await sb
    .from('subscriptions')
    .select('status, ends_at, test_mode')
    .eq('user_id', userId)

  if (error) throw error

  return (data as SubscriptionPortalRow[] | null)?.some(subscription =>
    !subscription.test_mode && subscriptionGrantsAccess(subscription),
  ) ?? false
}

export async function syncProfileMembership(
  sb: SupabaseClient,
  userId: string,
) {
  const { data: activeSubscriptions, error: activeError } = await sb
    .from('subscriptions')
    .select('status, ends_at')
    .eq('user_id', userId)

  if (activeError) throw activeError

  const activeRows = (activeSubscriptions ?? [])
    .filter(subscription => subscriptionGrantsAccess(subscription))
  const hasMembership = activeRows.length > 0
  const activeEndsAt = activeRows
    .map(subscription => subscription.ends_at)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1) ?? null

  const { error } = await sb
    .from('profiles')
    .update({
      plan: hasMembership ? 'premium' : 'free',
      plan_expires_at: hasMembership ? activeEndsAt : null,
    })
    .eq('id', userId)

  if (error) throw error
  return hasMembership
}

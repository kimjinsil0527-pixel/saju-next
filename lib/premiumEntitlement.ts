import type { User } from '@supabase/supabase-js'
import { createServiceClient } from '@/lib/supabase'

const PREMIUM_PLAN = 'premium'
const ACTIVE_STATUS = 'done'

export async function hasPremiumEntitlement(user: User | null) {
  if (!user?.id || !user.email || !user.email_confirmed_at) return false

  const sb = createServiceClient()
  const { data: linked, error: linkedError } = await sb
    .from('payments')
    .select('id')
    .eq('user_id', user.id)
    .eq('plan', PREMIUM_PLAN)
    .eq('status', ACTIVE_STATUS)
    .limit(1)

  if (linkedError) throw linkedError
  if (linked?.length) return true

  const normalizedEmail = user.email.trim().toLowerCase()
  const { data: legacy, error: legacyError } = await sb
    .from('payments')
    .select('id')
    .is('user_id', null)
    .ilike('customer_email', normalizedEmail)
    .eq('plan', PREMIUM_PLAN)
    .eq('status', ACTIVE_STATUS)

  if (legacyError) throw legacyError
  if (!legacy?.length) return false

  const legacyIds = legacy.map(payment => payment.id)
  const { error: linkError } = await sb
    .from('payments')
    .update({ user_id: user.id })
    .in('id', legacyIds)

  if (linkError) throw linkError
  return true
}

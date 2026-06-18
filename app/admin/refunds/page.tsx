import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import RefundsClient from './RefundsClient'
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth'
import { maskEmail, maskIdentifier } from '@/lib/adminPrivacy'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type RefundPaymentCustomer = {
  customer_name: string | null
  customer_email: string | null
}

function sanitizeRefundCustomer(value: unknown): RefundPaymentCustomer | null {
  const customer = Array.isArray(value) ? value[0] : value
  if (!customer || typeof customer !== 'object') return null

  const record = customer as Record<string, unknown>
  return {
    customer_name:
      typeof record.customer_name === 'string' ? record.customer_name : null,
    customer_email:
      typeof record.customer_email === 'string'
        ? maskEmail(record.customer_email)
        : null,
  }
}

async function getRefundReviews() {
  try {
    const sb = createServiceClient()
    const { data, error } = await sb
      .from('payment_refund_reviews')
      .select(`
        id,
        payment_reference,
        product_key,
        refunded_amount,
        status,
        reason,
        created_at,
        payments (
          customer_name,
          customer_email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) throw error
    const reviews = (data ?? []).map(review => ({
      ...review,
      payment_reference: maskIdentifier(review.payment_reference),
      payments: sanitizeRefundCustomer(review.payments),
    }))

    return { reviews, error: null }
  } catch (error) {
    return { reviews: [], error: String(error) }
  }
}

export default async function RefundsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!verifyAdminSession(token)) redirect('/admin/login')

  const { reviews, error } = await getRefundReviews()
  return <RefundsClient reviews={reviews} error={error} />
}

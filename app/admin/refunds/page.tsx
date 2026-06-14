import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import RefundsClient from './RefundsClient'

async function getRefundReviews() {
  try {
    const sb = createServiceClient()
    const { data, error } = await sb
      .from('payment_refund_reviews')
      .select(`
        id,
        event_key,
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
      payments: Array.isArray(review.payments)
        ? review.payments[0] ?? null
        : review.payments ?? null,
    }))

    return { reviews, error: null }
  } catch (error) {
    return { reviews: [], error: String(error) }
  }
}

export default async function RefundsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token || token !== process.env.AUTH_SECRET) redirect('/admin/login')

  const { reviews, error } = await getRefundReviews()
  return <RefundsClient reviews={reviews} error={error} />
}

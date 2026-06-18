import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import PaymentsClient from './PaymentsClient'
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth'
import { maskEmail, maskIdentifier } from '@/lib/adminPrivacy'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getPayments() {
  try {
    const sb = createServiceClient()
    const { data, error } = await sb
      .from('payments')
      .select('id, order_id, amount, plan, status, customer_name, customer_email, created_at')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) throw error
    return {
      payments: (data ?? []).map(payment => ({
        ...payment,
        order_id: maskIdentifier(payment.order_id),
        customer_email: maskEmail(payment.customer_email),
      })),
      error: null,
    }
  } catch (e) {
    return { payments: [], error: String(e) }
  }
}

export default async function PaymentsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!verifyAdminSession(token)) redirect('/admin/login')

  const { payments, error } = await getPayments()
  return <PaymentsClient payments={payments} error={error} />
}

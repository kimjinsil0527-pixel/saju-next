import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import PaymentsClient from './PaymentsClient'
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth'

async function getPayments() {
  try {
    const sb = createServiceClient()
    const { data, error } = await sb
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) throw error
    return { payments: data ?? [], error: null }
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

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from './AdminDashboard'
import { createServiceClient } from '@/lib/supabase'

async function getStats() {
  try {
    const sb = createServiceClient()
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const [
      { count: totalViews },
      { count: todayViews },
      { data: payments },
      { data: recentPayments },
      { data: popularPages },
    ] = await Promise.all([
      sb.from('page_views').select('*', { count: 'exact', head: true }),
      sb.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
      sb.from('payments').select('amount, status, plan, created_at').eq('status', 'done'),
      sb.from('payments').select('*').order('created_at', { ascending: false }).limit(20),
      sb.from('page_views').select('path').gte('created_at', monthStart),
    ])

    const totalRevenue = (payments ?? []).reduce((sum: number, p: { amount: number }) => sum + p.amount, 0)
    const monthRevenue = (payments ?? [])
      .filter((p: { created_at: string }) => p.created_at >= monthStart)
      .reduce((sum: number, p: { amount: number }) => sum + p.amount, 0)

    // 페이지별 집계
    const pathCounts: Record<string, number> = {}
    for (const row of popularPages ?? []) {
      pathCounts[row.path] = (pathCounts[row.path] || 0) + 1
    }
    const topPages = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, count]) => ({ path, count }))

    return {
      totalViews: totalViews ?? 0,
      todayViews: todayViews ?? 0,
      totalRevenue,
      monthRevenue,
      totalPayments: (payments ?? []).length,
      recentPayments: recentPayments ?? [],
      topPages,
    }
  } catch {
    // Supabase 미연결 시 데모 데이터 (실제 연동 전 UI 미리보기용)
    return {
      totalViews: 18420,
      todayViews: 342,
      totalRevenue: 2847000,
      monthRevenue: 486000,
      totalPayments: 187,
      isDemoData: true,
      recentPayments: [
        { id: '1', order_id: 'ORD-DEMO-001', amount: 12900, plan: 'premium', status: 'done', customer_name: '—', customer_email: '(demo)', created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
        { id: '2', order_id: 'ORD-DEMO-002', amount: 79900, plan: 'vip', status: 'done', customer_name: '—', customer_email: '(demo)', created_at: new Date(Date.now() - 1000 * 60 * 80).toISOString() },
        { id: '3', order_id: 'ORD-DEMO-003', amount: 12900, plan: 'premium', status: 'done', customer_name: '—', customer_email: '(demo)', created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
        { id: '4', order_id: 'ORD-DEMO-004', amount: 12900, plan: 'premium', status: 'pending', customer_name: '—', customer_email: '(demo)', created_at: new Date(Date.now() - 1000 * 60 * 310).toISOString() },
        { id: '5', order_id: 'ORD-DEMO-005', amount: 8900, plan: 'annual', status: 'done', customer_name: '—', customer_email: '(demo)', created_at: new Date(Date.now() - 1000 * 60 * 500).toISOString() },
      ],
      topPages: [
        { path: '/love-hub', count: 3240 },
        { path: '/fortune', count: 2980 },
        { path: '/today', count: 2710 },
        { path: '/tarot', count: 1890 },
        { path: '/compatibility', count: 1430 },
        { path: '/love-hub/crush', count: 1200 },
        { path: '/lucky', count: 980 },
        { path: '/dream', count: 760 },
      ],
    }
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token || token !== process.env.AUTH_SECRET) redirect('/admin/login')

  const stats = await getStats()
  return <AdminDashboard stats={stats} />
}

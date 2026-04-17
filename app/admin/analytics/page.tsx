import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import AnalyticsClient from './AnalyticsClient'

async function getAnalytics() {
  try {
    const sb = createServiceClient()
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const [
      { count: totalViews },
      { count: todayViews },
      { count: weekViews },
      { data: allViews },
    ] = await Promise.all([
      sb.from('page_views').select('*', { count: 'exact', head: true }),
      sb.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
      sb.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
      sb.from('page_views').select('path, created_at').gte('created_at', monthStart).limit(5000),
    ])

    // 페이지별 집계
    const pathCounts: Record<string, number> = {}
    const dayCounts: Record<string, number> = {}
    for (const row of allViews ?? []) {
      pathCounts[row.path] = (pathCounts[row.path] || 0) + 1
      const day = row.created_at.slice(0, 10)
      dayCounts[day] = (dayCounts[day] || 0) + 1
    }

    const topPages = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([path, count]) => ({ path, count }))

    const dailyTrend = Object.entries(dayCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-30)
      .map(([date, count]) => ({ date, count }))

    return { totalViews: totalViews ?? 0, todayViews: todayViews ?? 0, weekViews: weekViews ?? 0, topPages, dailyTrend, error: null }
  } catch (e) {
    return { totalViews: 0, todayViews: 0, weekViews: 0, topPages: [], dailyTrend: [], error: String(e) }
  }
}

export default async function AnalyticsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token || token !== process.env.AUTH_SECRET) redirect('/admin/login')

  const data = await getAnalytics()
  return <AnalyticsClient {...data} />
}

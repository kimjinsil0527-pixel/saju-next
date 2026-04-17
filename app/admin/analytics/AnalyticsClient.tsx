'use client'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

type Props = {
  totalViews: number
  todayViews: number
  weekViews: number
  topPages: { path: string; count: number }[]
  dailyTrend: { date: string; count: number }[]
  error: string | null
}

function fmt(n: number) { return n.toLocaleString('ko-KR') }

export default function AnalyticsClient({ totalViews, todayViews, weekViews, topPages, dailyTrend, error }: Props) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const maxCount = Math.max(...topPages.map(p => p.count), 1)
  const trendMax = Math.max(...dailyTrend.map(d => d.count), 1)

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>MINGYUN</div>
        <div className={styles.sidebarSub}>Admin Panel</div>
        <nav className={styles.sidebarNav}>
          <a href="/admin" className={styles.navItem}><span>📊</span> 대시보드</a>
          <a href="/admin/payments" className={styles.navItem}><span>💳</span> 결제 내역</a>
          <a href="/admin/analytics" className={`${styles.navItem} ${styles.navActive}`}><span>📈</span> 방문 분석</a>
        </nav>
        <div className={styles.sidebarBottom}>
          <a href="/" className={styles.navItem} target="_blank"><span>🌐</span> 사이트 보기</a>
          <button className={styles.logoutBtn} onClick={handleLogout}><span>🚪</span> 로그아웃</button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>방문 분석</h1>
          <div className={styles.liveTag}>● LIVE</div>
        </div>

        {error && <div className={styles.demoNotice}>⚠ 데이터 로딩 오류: {error}</div>}

        <div className={styles.statsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👁</div>
            <div className={styles.statValue}>{fmt(totalViews)}</div>
            <div className={styles.statLabel}>전체 페이지뷰</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statValue}>{fmt(todayViews)}</div>
            <div className={styles.statLabel}>오늘 방문</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📆</div>
            <div className={styles.statValue}>{fmt(weekViews)}</div>
            <div className={styles.statLabel}>최근 7일</div>
          </div>
        </div>

        <div className={styles.twoCol}>
          {/* 인기 페이지 */}
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>인기 페이지 (이번 달)</div>
            </div>
            {topPages.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📊</div>
                <p>아직 방문 데이터가 없습니다.<br />사이트에 방문자가 생기면 여기에 표시됩니다.</p>
              </div>
            ) : (
              <div className={styles.pageList}>
                {topPages.map((p, i) => (
                  <div key={p.path} className={styles.pageRow}>
                    <div className={styles.pageRank}>{i + 1}</div>
                    <div className={styles.pageInfo}>
                      <div className={styles.pagePath}>{p.path}</div>
                      <div className={styles.pageBar}>
                        <div
                          className={styles.pageBarFill}
                          style={{ width: `${(p.count / maxCount) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', minWidth: 36, textAlign: 'right' }}>
                      {fmt(p.count)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 일별 트렌드 */}
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>일별 방문 추이 (30일)</div>
            </div>
            {dailyTrend.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📈</div>
                <p>데이터가 쌓이면 트렌드가 표시됩니다.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 140, padding: '8px 0' }}>
                {dailyTrend.map(d => (
                  <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div
                      title={`${d.date}: ${d.count}회`}
                      style={{
                        width: '100%',
                        height: `${Math.max(4, (d.count / trendMax) * 110)}px`,
                        background: 'rgba(212,175,55,0.5)',
                        borderRadius: '2px 2px 0 0',
                        transition: 'height 0.3s',
                      }}
                    />
                    {dailyTrend.length <= 14 && (
                      <div style={{ fontSize: 9, color: 'var(--muted)', transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>
                        {d.date.slice(5)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

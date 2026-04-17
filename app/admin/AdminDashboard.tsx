'use client'
import { useRouter } from 'next/navigation'
import styles from './admin.module.css'

type Payment = {
  id: string
  order_id: string
  amount: number
  plan: string
  status: string
  customer_name: string
  customer_email: string
  created_at: string
}

type Stats = {
  totalViews: number
  todayViews: number
  totalRevenue: number
  monthRevenue: number
  totalPayments: number
  isDemoData?: boolean
  recentPayments: Payment[]
  topPages: { path: string; count: number }[]
}

function fmt(n: number) {
  return n.toLocaleString('ko-KR')
}

function fmtMoney(n: number) {
  return '₩' + n.toLocaleString('ko-KR')
}

function fmtDate(s: string) {
  return new Date(s).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  done: { label: '완료', color: 'var(--jade)' },
  pending: { label: '대기', color: 'var(--gold)' },
  failed: { label: '실패', color: 'var(--ember)' },
  canceled: { label: '취소', color: 'var(--muted)' },
}

const PLAN_LABEL: Record<string, string> = {
  premium: 'Premium',
  vip: 'VIP',
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className={styles.page}>
      {/* 사이드바 */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>MINGYUN</div>
        <div className={styles.sidebarSub}>Admin Panel</div>
        <nav className={styles.sidebarNav}>
          <a href="/admin" className={`${styles.navItem} ${styles.navActive}`}>
            <span>📊</span> 대시보드
          </a>
          <a href="/admin/payments" className={styles.navItem}>
            <span>💳</span> 결제 내역
          </a>
          <a href="/admin/analytics" className={styles.navItem}>
            <span>📈</span> 방문 분석
          </a>
        </nav>
        <div className={styles.sidebarBottom}>
          <a href="/" className={styles.navItem} target="_blank">
            <span>🌐</span> 사이트 보기
          </a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span>🚪</span> 로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 */}
      <main className={styles.main}>
        {stats.isDemoData && (
          <div className={styles.demoNotice}>
            ⚠ Supabase 미연결 상태입니다. 현재 데모 데이터를 표시 중입니다. 실제 데이터를 보려면 .env.local에 Supabase 키를 설정하세요.
          </div>
        )}
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>대시보드</h1>
          <div className={styles.topBarRight}>
            <div className={styles.liveTag}>● {stats.isDemoData ? 'DEMO' : 'LIVE'}</div>
          </div>
        </div>

        {/* 핵심 통계 카드 */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👁</div>
            <div className={styles.statValue}>{fmt(stats.totalViews)}</div>
            <div className={styles.statLabel}>전체 페이지뷰</div>
            <div className={styles.statSub}>오늘 +{fmt(stats.todayViews)}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statValue}>{fmtMoney(stats.totalRevenue)}</div>
            <div className={styles.statLabel}>전체 매출</div>
            <div className={styles.statSub}>이번 달 {fmtMoney(stats.monthRevenue)}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🧾</div>
            <div className={styles.statValue}>{fmt(stats.totalPayments)}</div>
            <div className={styles.statLabel}>완료 결제 건수</div>
            <div className={styles.statSub}>성공 결제만 집계</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statValue}>{fmt(stats.todayViews)}</div>
            <div className={styles.statLabel}>오늘 방문자</div>
            <div className={styles.statSub}>{new Date().toLocaleDateString('ko-KR')}</div>
          </div>
        </div>

        <div className={styles.twoCol}>
          {/* 최근 결제 내역 */}
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>최근 결제 내역</div>
              <a href="/admin/payments" className={styles.cardLink}>전체 보기 →</a>
            </div>
            {stats.recentPayments.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>💳</div>
                <p>결제 내역이 없습니다.<br />Supabase 연동 후 실시간으로 표시됩니다.</p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>일시</th>
                    <th>고객</th>
                    <th>플랜</th>
                    <th>금액</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPayments.map((p) => {
                    const st = STATUS_LABEL[p.status] ?? { label: p.status, color: 'var(--muted)' }
                    return (
                      <tr key={p.id}>
                        <td className={styles.tdMuted}>{fmtDate(p.created_at)}</td>
                        <td>
                          <div>{p.customer_name || '—'}</div>
                          <div className={styles.tdSub}>{p.customer_email || ''}</div>
                        </td>
                        <td><span className={styles.planBadge}>{PLAN_LABEL[p.plan] ?? p.plan}</span></td>
                        <td className={styles.tdMoney}>{fmtMoney(p.amount)}</td>
                        <td><span className={styles.statusDot} style={{ color: st.color }}>● {st.label}</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* 인기 페이지 */}
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>이번 달 인기 페이지</div>
            </div>
            {stats.topPages.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📄</div>
                <p>방문 데이터가 없습니다.<br />Supabase 연동 후 표시됩니다.</p>
              </div>
            ) : (
              <div className={styles.pageList}>
                {stats.topPages.map((p, i) => {
                  const max = stats.topPages[0]?.count || 1
                  return (
                    <div key={p.path} className={styles.pageRow}>
                      <div className={styles.pageRank}>{i + 1}</div>
                      <div className={styles.pageInfo}>
                        <div className={styles.pagePath}>{p.path}</div>
                        <div className={styles.pageBar}>
                          <div className={styles.pageBarFill} style={{ width: `${(p.count / max) * 100}%` }} />
                        </div>
                      </div>
                      <div className={styles.pageCount}>{fmt(p.count)}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className={styles.quickLinks}>
          <div className={styles.cardTitle} style={{ marginBottom: 14 }}>빠른 이동</div>
          <div className={styles.quickGrid}>
            {[
              { label: '홈', href: '/' },
              { label: '사주 차트', href: '/fortune' },
              { label: '오늘의 운세', href: '/today' },
              { label: '타로', href: '/tarot' },
              { label: '궁합', href: '/compatibility' },
              { label: '별자리', href: '/horoscope' },
              { label: '결제 페이지', href: '/checkout?plan=premium' },
              { label: '대시보드', href: '/dashboard' },
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" className={styles.quickItem}>{l.label} ↗</a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

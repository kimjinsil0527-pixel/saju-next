'use client'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

type Payment = {
  id: string
  order_id: string
  payment_key: string | null
  amount: number
  plan: string
  status: string
  customer_name: string | null
  customer_email: string | null
  created_at: string
}

function fmtMoney(n: number) { return '₩' + n.toLocaleString('ko-KR') }
function fmtDate(s: string) {
  return new Date(s).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  done:     { label: '완료', color: 'var(--jade)' },
  pending:  { label: '대기', color: 'var(--gold)' },
  failed:   { label: '실패', color: 'var(--ember)' },
  canceled: { label: '취소', color: 'var(--muted)' },
}

const PLAN_LABEL: Record<string, string> = { premium: 'Premium', vip: 'VIP', annual: 'Annual' }

export default function PaymentsClient({ payments, error }: { payments: Payment[]; error: string | null }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const totalRevenue = payments.filter(p => p.status === 'done').reduce((s, p) => s + p.amount, 0)
  const doneCount = payments.filter(p => p.status === 'done').length

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>MINGYUN</div>
        <div className={styles.sidebarSub}>Admin Panel</div>
        <nav className={styles.sidebarNav}>
          <a href="/admin" className={styles.navItem}><span>📊</span> 대시보드</a>
          <a href="/admin/payments" className={`${styles.navItem} ${styles.navActive}`}><span>💳</span> 결제 내역</a>
          <a href="/admin/analytics" className={styles.navItem}><span>📈</span> 방문 분석</a>
        </nav>
        <div className={styles.sidebarBottom}>
          <a href="/" className={styles.navItem} target="_blank"><span>🌐</span> 사이트 보기</a>
          <button className={styles.logoutBtn} onClick={handleLogout}><span>🚪</span> 로그아웃</button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>결제 내역</h1>
          <div className={styles.liveTag}>● LIVE</div>
        </div>

        {error && (
          <div className={styles.demoNotice}>⚠ 데이터 로딩 오류: {error}</div>
        )}

        <div className={styles.statsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statValue}>{fmtMoney(totalRevenue)}</div>
            <div className={styles.statLabel}>전체 매출</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statValue}>{doneCount}</div>
            <div className={styles.statLabel}>완료된 결제</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📋</div>
            <div className={styles.statValue}>{payments.length}</div>
            <div className={styles.statLabel}>전체 주문</div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>전체 결제 목록</div>
          </div>
          {payments.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>💳</div>
              <p>아직 결제 내역이 없습니다.</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>고객</th>
                  <th>플랜</th>
                  <th>금액</th>
                  <th>상태</th>
                  <th>일시</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => {
                  const st = STATUS_LABEL[p.status] ?? { label: p.status, color: 'var(--muted)' }
                  return (
                    <tr key={p.id}>
                      <td><span style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.order_id}</span></td>
                      <td>
                        <div>{p.customer_name || '—'}</div>
                        <div className={styles.tdSub}>{p.customer_email || ''}</div>
                      </td>
                      <td><span className={styles.planBadge}>{PLAN_LABEL[p.plan] ?? p.plan}</span></td>
                      <td className={styles.tdMoney}>{fmtMoney(p.amount)}</td>
                      <td><span className={styles.statusDot} style={{ color: st.color }}>{st.label}</span></td>
                      <td className={styles.tdMuted}>{fmtDate(p.created_at)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

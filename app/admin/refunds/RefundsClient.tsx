'use client'

import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

type RefundReview = {
  id: string
  event_key: string
  payment_reference: string | null
  product_key: string | null
  refunded_amount: number
  status: 'auto_reversed' | 'pending_review'
  reason: string
  created_at: string
  payments: {
    customer_name: string | null
    customer_email: string | null
  } | null
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

function formatDate(value: string) {
  return new Date(value).toLocaleString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function RefundsClient({
  reviews,
  error,
}: {
  reviews: RefundReview[]
  error: string | null
}) {
  const router = useRouter()
  const pendingCount = reviews.filter(review => review.status === 'pending_review').length
  const reversedCount = reviews.filter(review => review.status === 'auto_reversed').length

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>UNMYUNG</div>
        <div className={styles.sidebarSub}>Admin Panel</div>
        <nav className={styles.sidebarNav}>
          <a href="/admin" className={styles.navItem}>대시보드</a>
          <a href="/admin/payments" className={styles.navItem}>결제 내역</a>
          <a href="/admin/refunds" className={`${styles.navItem} ${styles.navActive}`}>환불 검토</a>
          <a href="/admin/analytics" className={styles.navItem}>방문 분석</a>
        </nav>
        <div className={styles.sidebarBottom}>
          <a href="/" className={styles.navItem} target="_blank">사이트 보기</a>
          <button className={styles.logoutBtn} onClick={handleLogout}>로그아웃</button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>환불 검토</h1>
          <div className={styles.liveTag}>SECURE</div>
        </div>

        {error && (
          <div className={styles.demoNotice}>데이터 로딩 오류: {error}</div>
        )}

        <div
          className={styles.statsGrid}
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}
        >
          <div className={styles.statCard}>
            <div className={styles.statValue}>{pendingCount}</div>
            <div className={styles.statLabel}>직접 확인 필요</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{reversedCount}</div>
            <div className={styles.statLabel}>쿠키 자동 회수</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{reviews.length}</div>
            <div className={styles.statLabel}>전체 환불 알림</div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>환불 처리 기록</div>
          </div>
          {reviews.length === 0 ? (
            <div className={styles.empty}>
              <p>아직 환불 알림이 없습니다.</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>고객</th>
                  <th>상품</th>
                  <th>금액</th>
                  <th>처리 상태</th>
                  <th>확인 내용</th>
                  <th>일시</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => {
                  const payment = review.payments
                  return (
                    <tr key={review.id}>
                        <td>
                          <div>{payment?.customer_name || '—'}</div>
                          <div className={styles.tdSub}>
                            {payment?.customer_email || review.payment_reference || ''}
                          </div>
                        </td>
                        <td>
                          <span className={styles.planBadge}>
                            {review.product_key || 'unknown'}
                          </span>
                        </td>
                        <td className={styles.tdMoney}>
                          {formatMoney(review.refunded_amount)}
                        </td>
                        <td>
                          <span
                            className={styles.statusDot}
                            style={{
                              color: review.status === 'auto_reversed'
                                ? 'var(--jade)'
                                : 'var(--ember)',
                            }}
                          >
                            {review.status === 'auto_reversed'
                              ? '쿠키 자동 회수'
                              : '직접 확인 필요'}
                          </span>
                        </td>
                        <td className={styles.tdMuted}>{review.reason}</td>
                        <td className={styles.tdMuted}>{formatDate(review.created_at)}</td>
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

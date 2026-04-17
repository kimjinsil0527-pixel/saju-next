import Link from 'next/link'
import styles from './dashboard.module.css'

const recentReadings = [
  { date: 'Mar 20, 2025', type: 'Free Reading', summary: 'Daily fortune · Fire Day Master', href: '/fortune?date=2000-03-15&gender=Female&calendar=Solar&hour=snake' },
  { date: 'Mar 15, 2025', type: 'Free Reading', summary: 'Four Pillars chart · Wood element dominant', href: '/fortune?date=1992-07-22&gender=Male&calendar=Solar&hour=dragon' },
]

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <div className={styles.navRight}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <div className={styles.userBadge}>J</div>
        </div>
      </nav>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav className={styles.sideNav}>
            <div className={styles.sideItem + ' ' + styles.sideActive}>
              <span>◈</span> Dashboard
            </div>
            <Link href="/" className={styles.sideItem}>
              <span>✦</span> New Reading
            </Link>
            <Link href="/counseling" className={styles.sideItem}>
              <span>☽</span> Book Consultation
            </Link>
            <Link href="/checkout?plan=premium" className={styles.sideItem}>
              <span>★</span> Upgrade to Premium
            </Link>
            <div className={styles.sideDivider} />
            <Link href="/support" className={styles.sideItem}>
              <span>?</span> Support
            </Link>
            <Link href="/signin" className={styles.sideItem}>
              <span>→</span> Sign Out
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className={styles.main}>
          <div className={styles.welcome}>
            <h1 className={styles.greeting}>Welcome back, Jane</h1>
            <p className={styles.greetingSub}>Your cosmic record — all in one place.</p>
          </div>

          {/* Plan Banner */}
          <div className={styles.planBanner}>
            <div className={styles.planLeft}>
              <div className={styles.planBadge}>FREE</div>
              <div className={styles.planText}>
                <div className={styles.planName}>Free Plan</div>
                <div className={styles.planDesc}>Upgrade to unlock your annual report, deep analyses, and more.</div>
              </div>
            </div>
            <Link href="/checkout?plan=premium" className={styles.upgradeBtn}>Upgrade to Premium →</Link>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickGrid}>
            <Link href="/" className={styles.quickCard}>
              <span className={styles.quickIcon}>✦</span>
              <div className={styles.quickTitle}>New Reading</div>
              <div className={styles.quickDesc}>Get today's free birth chart reading</div>
            </Link>
            <Link href="/counseling" className={styles.quickCard}>
              <span className={styles.quickIcon}>☽</span>
              <div className={styles.quickTitle}>Book Consultation</div>
              <div className={styles.quickDesc}>Live 1:1 with a verified master</div>
            </Link>
            <Link href="/checkout?plan=premium" className={styles.quickCard}>
              <span className={styles.quickIcon}>★</span>
              <div className={styles.quickTitle}>Annual Report</div>
              <div className={styles.quickDesc}>Unlock your 40-page PDF report</div>
            </Link>
          </div>

          {/* Recent Readings */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Recent Readings</h2>
            <div className={styles.readingList}>
              {recentReadings.map((r) => (
                <Link key={r.date} href={r.href} className={styles.readingCard}>
                  <div className={styles.readingLeft}>
                    <div className={styles.readingDate}>{r.date}</div>
                    <div className={styles.readingType}>{r.type}</div>
                    <div className={styles.readingSummary}>{r.summary}</div>
                  </div>
                  <span className={styles.readingArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Locked Premium Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Premium Reports</h2>
            <div className={styles.lockedCard}>
              <div className={styles.lockIcon}>🔒</div>
              <div className={styles.lockText}>
                <strong>Your annual report is waiting</strong>
                <p>Unlock wealth, career, love & health analysis across all 12 months of 2025.</p>
              </div>
              <Link href="/checkout?plan=premium" className={styles.lockBtn}>Unlock — $7.99/mo</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

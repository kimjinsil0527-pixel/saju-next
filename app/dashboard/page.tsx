import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signOutAction } from '@/app/auth/actions'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { hasPremiumEntitlement } from '@/lib/premiumEntitlement'
import styles from './dashboard.module.css'

export default async function Dashboard() {
  const user = await getAuthenticatedUser()
  if (!user) redirect('/signin')

  const email = user.email ?? 'Account'
  const initial = email.charAt(0).toUpperCase()
  let hasPremium = false

  try {
    hasPremium = await hasPremiumEntitlement(user)
  } catch (error) {
    console.error('dashboard premium status error:', error)
  }

  return (
    <main className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          UNMYUNG <span>FOUR PILLARS</span>
        </Link>
        <div className={styles.navRight}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <div className={styles.userBadge} title={email}>{initial}</div>
        </div>
      </nav>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideNav}>
            <Link href="/dashboard" className={`${styles.sideItem} ${styles.sideActive}`}>
              Account
            </Link>
            <Link href="/#hero" className={styles.sideItem}>Four Pillars</Link>
            <Link href="/today" className={styles.sideItem}>Today</Link>
            <Link href="/love-hub" className={styles.sideItem}>Love Hub</Link>
            <div className={styles.sideDivider} />
            <form action={signOutAction}>
              <button type="submit" className={styles.sideItem}>Sign Out</button>
            </form>
          </div>
        </aside>

        <section className={styles.main}>
          <div className={styles.welcome}>
            <h1 className={styles.greeting}>Your Account</h1>
            <p className={styles.greetingSub}>{email}</p>
          </div>

          <div className={styles.planBanner}>
            <div className={styles.planLeft}>
              <div className={styles.planBadge}>{hasPremium ? 'PREMIUM' : 'FREE'}</div>
              <div>
                <div className={styles.planName}>
                  {hasPremium ? 'Premium access active' : 'Free account'}
                </div>
                <div className={styles.planDesc}>
                  {hasPremium
                    ? 'Your completed purchase is securely linked to this account.'
                    : 'Premium purchases made with this email can be linked automatically.'}
                </div>
              </div>
            </div>
            <Link href={hasPremium ? '/#hero' : '/#pricing'} className={styles.upgradeBtn}>
              {hasPremium ? 'Start Premium Reading' : 'View Plans'}
            </Link>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Readings</h2>
            <div className={styles.quickGrid}>
              <Link href="/#hero" className={styles.quickCard}>
                <span className={styles.quickTitle}>Four Pillars</span>
                <span className={styles.quickDesc}>
                  Enter your birth information to open the full Premium analysis.
                </span>
              </Link>
              <Link href="/today" className={styles.quickCard}>
                <span className={styles.quickTitle}>Today</span>
                <span className={styles.quickDesc}>See today&apos;s energy and guidance.</span>
              </Link>
              <Link href="/love-hub" className={styles.quickCard}>
                <span className={styles.quickTitle}>Love Hub</span>
                <span className={styles.quickDesc}>
                  Explore free relationship previews. Detailed readings are still in development.
                </span>
              </Link>
            </div>
          </section>

          <form action={signOutAction}>
            <button type="submit" className={styles.logoutButton}>Sign Out</button>
          </form>
        </section>
      </div>
    </main>
  )
}

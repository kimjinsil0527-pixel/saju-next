import Link from 'next/link'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import { syncCompletedPaymentCookieGrants } from '@/lib/cookieWallet'
import { COOKIE_PACK_KEYS, PAYMENT_PRODUCTS } from '@/lib/paymentProductCatalog'
import styles from './credits.module.css'

export default async function CreditsPage() {
  const user = await getAuthenticatedUser()
  let balance: number | null = null

  if (user) {
    try {
      balance = (await syncCompletedPaymentCookieGrants(user)).balance
    } catch (error) {
      console.error('credits wallet error:', error)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>UNMYUNG <span>FOUR PILLARS</span></Link>
        <div className={styles.navActions}>
          {user ? (
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          ) : (
            <Link href="/signin?next=%2Fcredits" className={styles.navLink}>Sign In</Link>
          )}
        </div>
      </nav>

      <header className={styles.header}>
        <p className={styles.eyebrow}>COOKIE STORE</p>
        <h1>Buy cookies when you need them</h1>
        <p>
          One-time packs never start a subscription. Members and free accounts can both
          purchase them.
        </p>
        {balance !== null && (
          <div className={styles.balance}>
            Current balance <strong>{balance} cookies</strong>
          </div>
        )}
      </header>

      <section className={styles.packGrid} aria-label="One-time cookie packs">
        {COOKIE_PACK_KEYS.map((key, index) => {
          const product = PAYMENT_PRODUCTS[key]
          const readings = Math.floor(product.cookies / 15)

          return (
            <article className={`${styles.pack} ${index === 1 ? styles.featured : ''}`} key={key}>
              {index === 1 && <div className={styles.badge}>POPULAR</div>}
              <p className={styles.packName}>{product.shortName}</p>
              <div className={styles.price}>{product.displayPrice}</div>
              <p className={styles.billing}>One-time payment · taxes may apply</p>
              <div className={styles.divider} />
              <p className={styles.use}>
                Enough for {readings} Four Pillars deep {readings === 1 ? 'reading' : 'readings'}
                {product.cookies % 15 ? `, with ${product.cookies % 15} cookies left` : ''}
              </p>
              <ul>
                <li>No subscription</li>
                <li>Cookies do not expire</li>
                <li>Available to members and free accounts</li>
              </ul>
              <Link href={`/checkout?plan=${key}`} className={styles.buy}>
                Buy {product.cookies} Cookies
              </Link>
            </article>
          )
        })}
      </section>

      <section className={styles.comparison}>
        <div>
          <p className={styles.eyebrow}>BETTER MONTHLY VALUE</p>
          <h2>Need cookies regularly?</h2>
          <p>
            The monthly membership provides 35 cookies for $14.99. One-time packs are
            priced higher per cookie, so the membership remains the better recurring value.
          </p>
        </div>
        <Link href="/checkout?plan=premium" className={styles.membership}>
          View Monthly Membership
        </Link>
      </section>
    </main>
  )
}

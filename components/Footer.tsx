import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            MINGYUN<span>FOUR PILLARS</span>
          </Link>
          <p className={styles.tagline}>Decode your destiny through the ancient wisdom of Four Pillars.</p>
          <p className={styles.copy}>
            © 2026 MINGYUN. Fortune readings are for reference only.<br />
            Final decisions remain the responsibility of the user.
          </p>
        </div>

        <div className={styles.colGroup}>
          <div className={styles.col}>
            <div className={styles.colTitle}>Free Readings</div>
            <Link href="/today">Today&apos;s Fortune</Link>
            <Link href="/fortune">Four Pillars Chart</Link>
            <Link href="/tarot">Tarot Card</Link>
            <Link href="/compatibility">Compatibility</Link>
            <Link href="/dream">Dream Meanings</Link>
            <Link href="/lucky">Lucky Guide</Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Love & More</div>
            <Link href="/love-hub">Love Hub</Link>
            <Link href="/horoscope">Horoscope</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/year-ahead">Year Ahead</Link>
            <Link href="/counseling">Expert Consult</Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Account</div>
            <Link href="/credits">★ Credits</Link>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Create Account</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/support">Support</Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Company</div>
            <Link href="/partner">Partnership</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 MINGYUN. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/support">Support</Link>
        </div>
      </div>
    </footer>
  )
}

'use client'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav({ signedIn }: { signedIn: boolean }) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        UNMYUNG
        <span>FOUR PILLARS</span>
      </Link>

      <ul className={styles.links}>
        <li><Link href="/today">Today</Link></li>
        <li><Link href="/today">Fortune</Link></li>
        <li><Link href="/love-hub">Love</Link></li>
        <li><Link href="/lucky">Lucky</Link></li>
        <li><Link href="#pricing">Plans</Link></li>
      </ul>

      <div className={styles.cta}>
        <Link className={styles.accountLink} href={signedIn ? '/dashboard' : '/signin'}>
          {signedIn ? 'Account' : 'Sign In'}
        </Link>
        <button className="btn-primary" onClick={() => {
          const el = document.querySelector('#hero') ?? document.querySelector('section')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}>Start Free</button>
      </div>
    </nav>
  )
}

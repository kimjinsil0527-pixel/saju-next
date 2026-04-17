'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav() {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        MINGYUN
        <span>FOUR PILLARS</span>
      </Link>

      <ul className={styles.links}>
        <li><Link href="/today">Today</Link></li>
        <li><Link href="/fortune">Fortune</Link></li>
        <li><Link href="/love-hub">Love</Link></li>
        <li><Link href="/lucky">Lucky</Link></li>
        <li><Link href="#pricing">Plans</Link></li>
        <li><Link href="/credits">★ Credits</Link></li>
        <li><Link href="/counseling">Consult</Link></li>
      </ul>

      <div className={styles.cta}>
        <button className="btn-ghost" onClick={() => router.push('/signin')}>Sign In</button>
        <button className="btn-primary" onClick={() => {
          const el = document.querySelector('#hero') ?? document.querySelector('section')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}>Start Free</button>
      </div>
    </nav>
  )
}

'use client'
import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.wrap}>
        <div className={styles.code}>404</div>
        <div className={styles.symbol}>命</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The stars could not locate this page.<br />
          It may have moved, or perhaps it was never written in your destiny.
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.btnPrimary}>Return Home</Link>
          <Link href="/fortune" className={styles.btnGhost}>Read My Fortune</Link>
        </div>
        <div className={styles.suggestions}>
          <p className={styles.suggestLabel}>You might be looking for:</p>
          <div className={styles.suggestGrid}>
            <Link href="/today" className={styles.suggestItem}>🔮 Today&apos;s Fortune</Link>
            <Link href="/love-hub" className={styles.suggestItem}>💕 Love Hub</Link>
            <Link href="/tarot" className={styles.suggestItem}>🃏 Tarot Reading</Link>
            <Link href="/lucky" className={styles.suggestItem}>🍀 Lucky Guide</Link>
            <Link href="/compatibility" className={styles.suggestItem}>☯️ Compatibility</Link>
            <Link href="/credits" className={styles.suggestItem}>★ Get Credits</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

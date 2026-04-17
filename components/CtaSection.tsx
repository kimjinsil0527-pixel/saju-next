'use client'
import { useRouter } from 'next/navigation'
import ScrollReveal from './ScrollReveal'
import styles from './CtaSection.module.css'

export default function CtaSection() {
  const router = useRouter()
  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      <div className="section-wrap" style={{ maxWidth: '700px' }}>
        <ScrollReveal>
          <p className="section-eyebrow">Begin Your Journey</p>
          <div className="ornament-divider"><span className="ornament-symbol">✦</span></div>
          <h2 className={styles.title}>
            Your <span className={styles.gold}>2026</span> is<br />waiting to be read
          </h2>
          <p className={styles.sub}>
            Just enter your birth date and time. Free to start — no sign-up required.<br />
            Unlock deeper insight whenever you're ready.
          </p>
          <div className={styles.buttons}>
            <button className="btn-primary btn-large" onClick={() => { const el = document.querySelector('section'); el?.scrollIntoView({ behavior: 'smooth' }) }}>Start Free Reading →</button>
            <button className="btn-ghost btn-large" onClick={() => router.push('/checkout?plan=premium')}>Explore Premium</button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

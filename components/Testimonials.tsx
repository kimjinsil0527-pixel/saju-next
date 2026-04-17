import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './Testimonials.module.css'

const FEATURES = [
  { icon: '🔮', title: 'Instant Results', desc: 'Your chart is calculated the moment you enter your birth date. No waiting, no email required.' },
  { icon: '☯️', title: 'Rooted in Tradition', desc: 'All readings are based on classical Four Pillars methodology — the same system used for centuries.' },
  { icon: '🔒', title: 'Private by Default', desc: 'Your birth data is never stored beyond your session. We have no account to sell your data from.' },
  { icon: '💡', title: 'Free to Explore', desc: 'Core features are always free. No ads, no pop-ups, no dark patterns. Upgrade only if you want depth.' },
]

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="section-wrap">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">Why MINGYUN</p>
            <div className="ornament-divider"><span className="ornament-symbol">☽</span></div>
            <h2 className="section-title">Built with <span className="gold">integrity</span></h2>
            <p className="section-desc">We are a new service. No inflated numbers, no paid reviews — just honest tools based on classical wisdom.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className={styles.reviewCta}>
            <div className={styles.reviewCtaIcon}>✦</div>
            <p className={styles.reviewCtaText}>
              We&apos;re just getting started. Try a free reading and let us know what you think.
            </p>
            <Link href="/fortune" className={styles.reviewCtaBtn}>Start My Free Reading →</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

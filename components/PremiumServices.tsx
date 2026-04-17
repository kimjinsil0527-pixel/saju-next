'use client'
import { useRouter } from 'next/navigation'
import ScrollReveal from './ScrollReveal'
import styles from './PremiumServices.module.css'

const items = [
  { icon: '📊', label: 'Best Seller', title: 'Annual Fortune Report', desc: 'Monthly breakdown of wealth, career, love & health for the year — 40-page PDF included.', price: '$29.99' },
  { icon: '💼', label: 'Popular', title: 'Career & Vocation Analysis', desc: 'Optimal career paths, industries, and promotion timing based on your Day Master and Five Elements.', price: '$19.99' },
  { icon: '💕', label: 'Popular', title: 'Deep Compatibility Report', desc: 'Full chart comparison: conflict periods, ideal marriage timing, and the depth of your connection.', price: '$24.99' },
  { icon: '💰', label: 'New', title: 'Wealth Fortune Deep Dive', desc: 'When money flows in and out, investment timing, and your lucky colors, directions & numbers.', price: '$17.99' },
  { icon: '👶', label: 'Standalone', title: 'Name Analysis Service', desc: 'Four Pillars-based name analysis for newborns or name changes — stroke count, elements & tone.', price: '$39.99' },
  { icon: '🗓️', label: 'Standalone', title: 'Auspicious Date Selection', desc: 'Pick the perfect date for weddings, moves, business openings, or contracts using your chart.', price: '$34.99' },
]

export default function PremiumServices() {
  const router = useRouter()
  return (
    <section className={styles.section} id="premium">
      <div className="section-wrap">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">Premium Services</p>
            <div className="ornament-divider"><span className="ornament-symbol">卍</span></div>
            <h2 className="section-title">Go deeper with <span className="gold">expert analysis</span></h2>
            <p className="section-desc">Our most-purchased reports, available individually or bundled in Premium.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item.title} className={styles.item}>
                <div className={styles.iconWrap}>{item.icon}</div>
                <div className={styles.content}>
                  <div className={styles.itemLabel}>{item.label}</div>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemDesc}>{item.desc}</div>
                  <div className={styles.itemPrice}><span className={styles.from}>from</span>{item.price}</div>
                </div>
              </div>
            ))}

            {/* CTA span */}
            <div className={`${styles.item} ${styles.span2}`}>
              <div className={`${styles.iconWrap} ${styles.iconWrapGold}`}>🔭</div>
              <div className={styles.content} style={{ flex: 1 }}>
                <div className={styles.itemLabel}>Premium · Booking Required</div>
                <div className={styles.itemTitle}>Live 1:1 Consultation</div>
                <div className={styles.itemDesc}>A private session with a Four Pillars practitioner. Chat, phone, or video — session recording available on request.</div>
              </div>
              <div className={styles.ctaRight}>
                <div className={styles.ctaMeta}>from 30 min</div>
                <div className={styles.ctaPrice}>$79.99~</div>
                <button className={`btn-primary ${styles.ctaBtn}`} onClick={() => router.push('/counseling')}>Book a Consultant</button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

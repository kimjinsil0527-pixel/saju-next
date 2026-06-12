import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './LoveHubSection.module.css'

const FEATURED = [
  { icon: '💫', title: "Today's Love Energy",   desc: 'Daily love fortune score — attraction, openness, best time to connect.',  href: '/today',          free: true  },
  { icon: '💌', title: 'Crush Reading',          desc: 'Preview the questions this future personalized reading will explore.',      href: '/love-hub/crush', free: false },
  { icon: '🌟', title: 'Soulmate Profile',       desc: 'Preview the planned personality, timing, and relationship themes.',         href: '/love-hub/soulmate', free: false },
  { icon: '💑', title: 'Compatibility Check',    desc: 'Instant Five Elements score between two birth charts.',                     href: '/compatibility',  free: true  },
  { icon: '🔄', title: 'Will They Come Back?',   desc: 'Preview the reconciliation themes planned for this future reading.',        href: '/love-hub/ex-return', free: false },
  { icon: '💍', title: 'Marriage Timing',        desc: 'Preview the timing topics planned for this future reading.',                href: '/love-hub/marriage-timing', free: false },
]

export default function LoveHubSection() {
  return (
    <section className={styles.section} id="love">
      <div className="section-wrap">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow" style={{ color: '#e87fa0' }}>Love & Relationships</p>
            <div className="ornament-divider"><span className="ornament-symbol">♡</span></div>
            <h2 className="section-title">Every question about <span style={{ color: '#e87fa0' }}>love</span></h2>
            <p className="section-desc">Explore free previews. Detailed personalized Love Hub readings are still in development.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.grid}>
            {FEATURED.map(item => (
              <Link key={item.title} href={item.href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>{item.icon}</span>
                  {item.free
                    ? <span className={styles.badgeFree}>Free</span>
                    : <span className={styles.badgeCredits}>Preview</span>
                  }
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className={styles.footer}>
            <p className={styles.footerText}>+ 24 more free previews. Detailed readings cannot be purchased yet.</p>
            <Link href="/love-hub" className={styles.footerBtn}>See All Previews →</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

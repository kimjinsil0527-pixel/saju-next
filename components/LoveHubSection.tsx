import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './LoveHubSection.module.css'

const FEATURED = [
  { icon: '💫', title: "Today's Love Energy",   desc: 'Daily love fortune score — attraction, openness, best time to connect.',  href: '/today',          free: true  },
  { icon: '💌', title: 'Crush Reading',          desc: 'Does your crush feel the same? Get the timing for your next move.',         href: '/love-hub/crush', free: false, credits: 8  },
  { icon: '🌟', title: 'Soulmate Profile',       desc: 'Detailed profile of your destined person — personality, timing, signs.',   href: '/love-hub/soulmate', free: false, credits: 15 },
  { icon: '💑', title: 'Compatibility Check',    desc: 'Instant Five Elements score between two birth charts.',                     href: '/compatibility',  free: true  },
  { icon: '🔄', title: 'Will They Come Back?',   desc: 'Honest assessment of reconciliation energy and likely timing.',            href: '/love-hub/ex-return', free: false, credits: 12 },
  { icon: '💍', title: 'Marriage Timing',        desc: 'Your most auspicious marriage windows — by year and season.',              href: '/love-hub/marriage-timing', free: false, credits: 15 },
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
            <p className="section-desc">30+ readings covering crush, marriage, breakup, soulmate, compatibility — and everything between.</p>
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
                    : <span className={styles.badgeCredits}>★{item.credits}</span>
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
            <p className={styles.footerText}>+ 24 more readings: past life, love triangle, loyalty, wedding date selection & more</p>
            <Link href="/love-hub" className={styles.footerBtn}>See All Love Readings →</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

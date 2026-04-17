import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './FreeServices.module.css'

const services: { icon: string; title: string; desc: string; href: string; badgeOverride?: string }[] = [
  { icon: '🔮', title: "Today's Fortune", desc: 'Daily energy reading across wealth, career, health, and love — refreshed every day.', href: '/today' },
  { icon: '☯️', title: 'Four Pillars Chart', desc: 'Your full birth chart with all four pillars calculated and Five Elements distribution.', href: '/fortune' },
  { icon: '📅', title: 'Ten Thousand Year Calendar', desc: 'Look up any date\'s heavenly stems, earthly branches, and solar terms. Find auspicious days.', href: '/calendar' },
  { icon: '🃏', title: 'Single Tarot Card', desc: 'One card for the day. A direct, intuitive message for wherever you are right now.', href: '/tarot' },
  { icon: '💑', title: 'Compatibility Score', desc: 'Five Elements compatibility check between two birth charts — instant result.', href: '/compatibility' },
  { icon: '🌙', title: 'Dream Interpretation', desc: 'Search your dream symbols in our library of 1,200+ dream meanings.', href: '/dream' },
  { icon: '⭐', title: 'Zodiac Horoscope', desc: 'Weekly and monthly readings based on Western astrology for all 12 signs.', href: '/horoscope' },
  { icon: '🀄', title: 'Year Ahead Preview',  desc: "A one-line summary of your year's energy — full depth available in premium.", href: '/year-ahead' },
  { icon: '🍀', title: 'Daily Lucky Guide',  desc: 'Lucky colors, numbers, power direction & crystal — refreshed every day. Always free.', href: '/lucky' },
  { icon: '💕', title: 'Love Hub',           desc: '30+ love readings: crush, soulmate, compatibility, breakup, marriage timing & more.', href: '/love-hub', badgeOverride: 'Free+' },
]

export default function FreeServices() {
  return (
    <section className={styles.section} id="free-services">
      <div className="section-wrap">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">Free Services</p>
            <div className="ornament-divider"><span className="ornament-symbol">☽</span></div>
            <h2 className="section-title">
              Start for <span className="gold">free</span> — no account needed
            </h2>
            <p className="section-desc">Core features are fully free, no ads. Go deeper with Premium when you're ready.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.grid}>
            {services.map((s) => (
              <Link key={s.title} href={s.href} className={styles.card}>
                <span className={styles.icon}>{s.icon}</span>
                <span className={s.badgeOverride ? styles.badgePlus : styles.badge}>{s.badgeOverride ?? 'Free'}</span>
                <div className={styles.cardTitle}>{s.title}</div>
                <div className={styles.cardDesc}>{s.desc}</div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

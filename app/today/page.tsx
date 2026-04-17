'use client'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './today.module.css'
import { getYearPillar, getMonthPillar, getDayPillar, ELEMENT_COLORS, ELEMENT_EMOJI } from '@/lib/sajuCalc'

const DAILY_FORTUNES: Record<string, string[]> = {
  wood: [
    "Growth energy surrounds you today — a perfect time to start something new or revisit a creative project.",
    "Your natural flexibility serves you well. Bend without breaking, and watch an unexpected solution appear.",
    "Wood energy rises: focus on relationships and collaboration. A conversation today plants a meaningful seed.",
  ],
  fire: [
    "Bright fire energy burns today — your charisma is heightened. Step into the spotlight with confidence.",
    "Passion and clarity align. Act on what you've been hesitating over — momentum is on your side.",
    "Communication flows naturally under fire energy. Express yourself clearly; people are listening.",
  ],
  earth: [
    "Stable earth energy grounds you today. Take time to reflect and consolidate rather than push forward.",
    "Trustworthiness shines — others will lean on you today. Your steady presence is your greatest asset.",
    "Earth day: excellent for practical matters, signing documents, and making long-term decisions.",
  ],
  metal: [
    "Metal energy sharpens your mind today. Cut through confusion and make the call you've been delaying.",
    "Precision and detail are your allies. Finishing what's unfinished brings deep satisfaction.",
    "Clarity of purpose arrives under metal energy. What truly matters becomes unmistakably clear.",
  ],
  water: [
    "Water energy flows — wisdom and intuition are heightened. Trust your gut more than your logic today.",
    "A day for depth over breadth. One meaningful conversation or quiet insight is worth a week of activity.",
    "Dreams and inner signals carry weight today. Water energy connects you to what lies beneath the surface.",
  ],
}

const LUCKY_COLORS: Record<string, string> = {
  wood: 'Blue-Green, Forest Green', fire: 'Red, Orange, Bright Pink',
  earth: 'Yellow, Brown, Ochre', metal: 'White, Silver, Gold', water: 'Black, Navy, Deep Blue',
}

const LUCKY_NUMBERS: Record<string, string> = {
  wood: '3, 4, 8', fire: '2, 7, 9', earth: '5, 10, 0', metal: '4, 9, 6', water: '1, 6, 5',
}

const LUCKY_DIRS: Record<string, string> = {
  wood: 'East', fire: 'South', earth: 'Center', metal: 'West', water: 'North',
}

const CAUTIONS: Record<string, string> = {
  wood: 'Avoid hasty commitments — your enthusiasm may outpace the situation.',
  fire: 'Watch for impulsiveness. Pause before reacting emotionally.',
  earth: 'Resist over-caution. Excessive hesitation can become its own obstacle.',
  metal: 'Perfectionism may slow you down. Done is better than perfect today.',
  water: 'Guard against overthinking. Action, however small, breaks the cycle.',
}

export default function TodayPage() {
  const { year, month, day, weekday, pillar, element, fortune, dateStr } = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const pillar = getDayPillar(year, month, day)
    const element = pillar.element
    const fortunes = DAILY_FORTUNES[element] ?? DAILY_FORTUNES.earth
    const fortune = fortunes[(year + month + day) % fortunes.length]
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return {
      year, month, day,
      weekday: weekdays[now.getDay()],
      pillar,
      element,
      fortune,
      dateStr: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }
  }, [])

  const yp = useMemo(() => getYearPillar(new Date().getFullYear()), [])
  const mp = useMemo(() => getMonthPillar(new Date().getFullYear(), new Date().getMonth() + 1), [])

  const color = ELEMENT_COLORS[element] ?? '#fff'

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Daily Fortune</p>
        <div className={styles.ornament}><span>🔮</span></div>
        <h1 className={styles.title}>{weekday}, {dateStr}</h1>
        <p className={styles.sub}>Today's cosmic energy — live now, refreshed every day.</p>
      </div>

      <div className={styles.body}>
        {/* Day Element Card */}
        <div className={styles.elementHero} style={{ borderColor: color + '55' }}>
          <div className={styles.elementHeroTopLine} style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          <div className={styles.elementEmoji}>{ELEMENT_EMOJI[element]}</div>
          <div className={styles.elementLabel} style={{ color }}>Day Element</div>
          <div className={styles.elementName} style={{ color }}>{element.charAt(0).toUpperCase() + element.slice(1)}</div>
          <div className={styles.pillarRow}>
            <div className={styles.pillarMini}>
              <span className={styles.pillarHanja} style={{ color }}>{pillar.stemHanja}</span>
              <span className={styles.pillarRom}>{pillar.stem}</span>
            </div>
            <div className={styles.pillarSep}>·</div>
            <div className={styles.pillarMini}>
              <span className={styles.pillarHanja}>{pillar.branchHanja}</span>
              <span className={styles.pillarRom}>{pillar.branch}</span>
            </div>
          </div>
        </div>

        {/* Fortune Message */}
        <div className={styles.fortuneCard}>
          <div className={styles.fortuneQuote}>❝</div>
          <p className={styles.fortuneText}>{fortune}</p>
          <div className={styles.fortuneQuoteEnd}>❞</div>
        </div>

        {/* Today's Pillars */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Today's Heavenly & Earthly Pillars</h2>
          <div className={styles.pillarsRow}>
            {[
              { label: 'Year', p: yp },
              { label: 'Month', p: mp },
              { label: 'Day', p: pillar },
            ].map(({ label, p }) => (
              <div key={label} className={styles.pillarCard}>
                <div className={styles.pillarCardLabel}>{label}</div>
                <div className={styles.pillarCardStem} style={{ color: ELEMENT_COLORS[p.element] }}>{p.stemHanja}</div>
                <div className={styles.pillarCardRom}>{p.stem}</div>
                <div className={styles.pillarCardDivider} />
                <div className={styles.pillarCardBranch}>{p.branchHanja}</div>
                <div className={styles.pillarCardRom}>{p.branch}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lucky Guide */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Today's Lucky Guide</h2>
          <div className={styles.luckyGrid}>
            <div className={styles.luckyCard}>
              <div className={styles.luckyIcon}>🎨</div>
              <div className={styles.luckyLabel}>Lucky Colors</div>
              <div className={styles.luckyValue}>{LUCKY_COLORS[element]}</div>
            </div>
            <div className={styles.luckyCard}>
              <div className={styles.luckyIcon}>🔢</div>
              <div className={styles.luckyLabel}>Lucky Numbers</div>
              <div className={styles.luckyValue}>{LUCKY_NUMBERS[element]}</div>
            </div>
            <div className={styles.luckyCard}>
              <div className={styles.luckyIcon}>🧭</div>
              <div className={styles.luckyLabel}>Lucky Direction</div>
              <div className={styles.luckyValue}>{LUCKY_DIRS[element]}</div>
            </div>
          </div>
        </div>

        {/* Caution */}
        <div className={styles.cautionCard}>
          <span className={styles.cautionIcon}>⚠</span>
          <div>
            <div className={styles.cautionLabel}>Today's Caution</div>
            <p className={styles.cautionText}>{CAUTIONS[element]}</p>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <p className={styles.ctaText}>Want a full annual reading based on your birth chart?</p>
          <Link href="/" className={styles.ctaBtn}>Get My Free Reading →</Link>
        </div>
      </div>
    </div>
  )
}

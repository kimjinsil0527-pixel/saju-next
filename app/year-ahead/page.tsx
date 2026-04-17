'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './year-ahead.module.css'
import { getYearPillar, getMonthPillar, getDayPillar, getElementBalance, getDominant, getWeakness, ELEMENT_COLORS, ELEMENT_EMOJI, GENERATES, CONTROLS } from '@/lib/sajuCalc'

const CURRENT_YEAR = new Date().getFullYear()

const YEAR_THEMES: Record<string, { title: string; summary: string; focus: string; caution: string; opportunity: string }> = {
  wood: {
    title: 'Year of Growth & New Beginnings',
    summary: 'The Wood energy activating your chart this year signals expansion — new projects, new relationships, and new territory. This is a year to plant seeds, not harvest.',
    focus: 'Career growth, learning, health routines, starting creative projects',
    caution: 'Overextension — wood energy expands quickly but roots must keep pace',
    opportunity: 'Professional advancement and new partnerships are especially favored in spring months',
  },
  fire: {
    title: 'Year of Visibility & Transformation',
    summary: 'Fire energy brings you into the light. Expect recognition, passionate connections, and rapid change. What has been hidden or dormant will ignite this year.',
    focus: 'Leadership, creative expression, romance, visibility, social influence',
    caution: 'Burnout and impulsiveness — fire moves fast and can consume what it was meant to illuminate',
    opportunity: 'Summer months carry peak energy — major decisions made then tend to have lasting impact',
  },
  earth: {
    title: 'Year of Stability & Foundation',
    summary: 'Earth energy asks you to consolidate — build, deepen, and secure. What you invest in now forms the foundation for the next five-year cycle.',
    focus: 'Financial stability, home and family, health, long-term commitments, reliability',
    caution: 'Resistance to change — earth can become stagnation if too much comfort is sought',
    opportunity: 'Real estate, long-term investments, and committed relationships are particularly well-starred',
  },
  metal: {
    title: 'Year of Clarity & Refinement',
    summary: 'Metal energy cuts through — bringing sharp clarity, necessary endings, and the refinement of what truly matters. A year to shed what no longer serves you.',
    focus: 'Discipline, restructuring, communication, justice, precision',
    caution: 'Rigidity and grief — metal\'s clarity can become harshness if compassion is forgotten',
    opportunity: 'Autumn months are most powerful for closing old chapters and launching refined new projects',
  },
  water: {
    title: 'Year of Depth & Wisdom',
    summary: 'Water energy moves you inward — toward insight, intuition, and the deeper currents of your life. This is a year for learning, reflection, and spiritual development.',
    focus: 'Inner growth, education, travel, creativity, emotional healing',
    caution: 'Isolation and over-thinking — water\'s depth can become stagnation without flow',
    opportunity: 'Winter months carry the most power for insight. A breakthrough in understanding is coming.',
  },
}

const INTERACTION_LABELS: Record<string, string> = {
  generates: 'Generative Year (相生)',
  controls: 'Challenging Year (相剋)',
  controlled: 'Pressure Year (被剋)',
  same: 'Resonant Year',
  neutral: 'Balanced Year',
}

const INTERACTION_DESC: Record<string, string> = {
  generates: 'Your birth element feeds and strengthens this year\'s energy — you will feel naturally supported and capable of significant growth.',
  controls: 'Your birth element challenges this year\'s energy — you carry authority and direction, but must guard against overreach.',
  controlled: 'This year\'s energy tests your birth element — expect meaningful pressure that ultimately refines your character.',
  same: 'Your birth element resonates with this year — deep alignment, but watch for intensity or excess in your natural tendencies.',
  neutral: 'Moderate interaction — a year of steady, reliable progress without extreme highs or lows.',
}

function getInteraction(birthEl: string, yearEl: string): string {
  if (birthEl === yearEl) return 'same'
  if (GENERATES[birthEl] === yearEl) return 'generates'
  if (CONTROLS[birthEl] === yearEl) return 'controls'
  if (GENERATES[yearEl] === birthEl) return 'controlled'
  return 'neutral'
}

const MONTHLY_PREVIEW = [
  { month: 'Jan', key: 'water', energy: 'Reflection', note: 'Set clear intentions. The Water month invites you to map your priorities before acting. Journaling or meditation brings surprising clarity.' },
  { month: 'Feb', key: 'wood', energy: 'Awakening', note: 'New energy stirs. Take initiative on plans you\'ve been sitting on — Wood energy rewards those who move first. Relationships begun now carry lasting potential.' },
  { month: 'Mar', key: 'wood', energy: 'Expansion', note: 'Momentum accelerates. Network actively and say yes to growth opportunities. This is one of the most productive months of the year for career moves.' },
  { month: 'Apr', key: 'fire', energy: 'Action', note: 'Bold moves pay off. Fire month amplifies visibility and charisma — ideal for presentations, launches, and making important asks.' },
  { month: 'May', key: 'fire', energy: 'Peak', note: 'Visibility is at its height. Social and professional recognition arrives. Romantic connections formed now are deeply passionate.' },
  { month: 'Jun', key: 'earth', energy: 'Grounding', note: 'Consolidate what you\'ve built. Earth month favors security, home decisions, and financial planning. Avoid overextension.' },
  { month: 'Jul', key: 'earth', energy: 'Stability', note: 'Deepen foundations.' },
  { month: 'Aug', key: 'metal', energy: 'Clarity', note: 'Cut what doesn\'t fit.' },
  { month: 'Sep', key: 'metal', energy: 'Harvest', note: 'Results arrive.' },
  { month: 'Oct', key: 'water', energy: 'Release', note: 'Let go gracefully.' },
  { month: 'Nov', key: 'water', energy: 'Insight', note: 'Deep understanding.' },
  { month: 'Dec', key: 'earth', energy: 'Integration', note: 'Prepare for renewal.' },
]

const FREE_MONTHS = 6

export default function YearAheadPage() {
  const [birthDate, setBirthDate] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState<null | ReturnType<typeof calcResult>>(null)

  function calcResult(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number)
    const yp = getYearPillar(y)
    const mp = getMonthPillar(y, m)
    const dp = getDayPillar(y, m, d)
    const balance = getElementBalance([yp.element, mp.element, dp.element])
    const dominant = getDominant(balance)
    const weakness = getWeakness(balance)
    const yearEl = getYearPillar(CURRENT_YEAR).element
    const interaction = getInteraction(dominant, yearEl)
    const theme = YEAR_THEMES[yearEl]
    return { yp, mp, dp, dominant, weakness, yearEl, interaction, theme, balance }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!birthDate) return
    setResult(calcResult(birthDate))
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Year Ahead Preview</p>
        <div className={styles.ornament}>🀄</div>
        <h1 className={styles.title}>Your <span className={styles.gold}>{CURRENT_YEAR} Energy</span></h1>
        <p className={styles.sub}>Enter your birth date to see how this year's energy interacts with your personal chart.</p>
      </div>

      <div className={styles.body}>
        {/* Form */}
        <div className={styles.formCard}>
          <div className={styles.topLine} />
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>Your Name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Alex"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <button type="submit" className={styles.calcBtn}>Reveal My {CURRENT_YEAR} Preview →</button>
          </form>
        </div>

        {result && (
          <div className={styles.resultWrap}>
            {/* Year Energy Banner */}
            <div className={styles.yearBanner} style={{ borderColor: ELEMENT_COLORS[result.yearEl] + '60', background: ELEMENT_COLORS[result.yearEl] + '08' }}>
              <div className={styles.yearBannerLeft}>
                <div className={styles.yearEmoji}>{ELEMENT_EMOJI[result.yearEl]}</div>
                <div>
                  <div className={styles.yearLabel} style={{ color: ELEMENT_COLORS[result.yearEl] }}>{CURRENT_YEAR} — {result.yearEl.charAt(0).toUpperCase() + result.yearEl.slice(1)} Year</div>
                  <div className={styles.yearTitle}>{result.theme.title}</div>
                </div>
              </div>
              <div className={styles.interactionBadge} style={{ color: ELEMENT_COLORS[result.yearEl], borderColor: ELEMENT_COLORS[result.yearEl] + '50' }}>
                {INTERACTION_LABELS[result.interaction]}
              </div>
            </div>

            {/* Interaction */}
            <div className={styles.interactionCard}>
              <div className={styles.interactionHeader}>
                <span className={styles.interactionEmoji}>{ELEMENT_EMOJI[result.dominant]}</span>
                <span className={styles.interactionArrow}>→</span>
                <span className={styles.interactionEmoji}>{ELEMENT_EMOJI[result.yearEl]}</span>
                <div className={styles.interactionTitle}>
                  {name ? name + '\'s' : 'Your'} <strong style={{ color: ELEMENT_COLORS[result.dominant] }}>{result.dominant}</strong> meets the <strong style={{ color: ELEMENT_COLORS[result.yearEl] }}>{result.yearEl}</strong> year
                </div>
              </div>
              <p className={styles.interactionText}>{INTERACTION_DESC[result.interaction]}</p>
            </div>

            {/* Year Summary */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Year Overview</div>
              <p className={styles.summaryText}>{result.theme.summary}</p>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <div className={styles.summaryItemLabel}>Focus Areas</div>
                  <div className={styles.summaryItemText}>{result.theme.focus}</div>
                </div>
                <div className={styles.summaryItem}>
                  <div className={styles.summaryItemLabel}>Watch For</div>
                  <div className={styles.summaryItemText}>{result.theme.caution}</div>
                </div>
              </div>
              <div className={styles.opportunityBox}>
                <div className={styles.opportunityLabel}>✦ Key Opportunity</div>
                <p className={styles.opportunityText}>{result.theme.opportunity}</p>
              </div>
            </div>

            {/* Monthly Flow — teaser */}
            <div className={styles.monthlyCard}>
              <div className={styles.monthlyHeader}>
                <div className={styles.monthlyTitle}>Monthly Energy Flow</div>
                <span className={styles.premiumTag}>Preview</span>
              </div>
              <div className={styles.monthlyGrid}>
                {MONTHLY_PREVIEW.map((m, i) => (
                  <div key={m.month} className={`${styles.monthBlock} ${i >= FREE_MONTHS ? styles.monthBlocked : ''}`}>
                    {i >= FREE_MONTHS ? (
                      <>
                        <div className={styles.monthName}>{m.month}</div>
                        <div className={styles.monthLock}>🔒</div>
                      </>
                    ) : (
                      <>
                        <div className={styles.monthName}>{m.month}</div>
                        <div className={styles.monthDot} style={{ background: ELEMENT_COLORS[m.key] }} />
                        <div className={styles.monthEnergy} style={{ color: ELEMENT_COLORS[m.key] }}>{m.energy}</div>
                        <div className={styles.monthNote}>{m.note}</div>
                        <div className={styles.monthEmoji}>{ELEMENT_EMOJI[m.key]}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.unlockBar}>
                <p>Unlock all 12 months + personalized month-by-month guidance with Premium</p>
                <Link href="/checkout?plan=premium" className={styles.unlockBtn}>Unlock Full Year →</Link>
              </div>
            </div>

            {/* Premium CTA */}
            <div className={styles.ctaCard}>
              <div className={styles.ctaLeft}>
                <div className={styles.ctaTitle}>Go Deeper with Premium</div>
                <p className={styles.ctaDesc}>Your Year Preview is just the beginning. Premium unlocks your full 10-year luck cycle, detailed monthly pillars, personalized remedies, and a complete Five Elements health and career analysis.</p>
              </div>
              <div className={styles.ctaRight}>
                <Link href="/checkout?plan=premium" className={styles.ctaBtn}>Get Full Report →</Link>
                <div className={styles.ctaNote}>From $10.99 · Instant Access</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

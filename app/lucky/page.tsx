'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import styles from './lucky.module.css'

const LUCKY_COLORS: Record<string, { colors: string[]; hex: string[]; meaning: string }> = {
  wood:  { colors: ['Forest Green', 'Teal', 'Olive'],       hex: ['#2D6A4F', '#0D9488', '#6B7C3D'], meaning: 'Growth, renewal, and fresh starts surround you today.' },
  fire:  { colors: ['Crimson Red', 'Coral Orange', 'Gold'], hex: ['#DC2626', '#EA580C', '#C8A96E'], meaning: 'Passion and creative energy are at their peak today.' },
  earth: { colors: ['Warm Yellow', 'Terracotta', 'Beige'],  hex: ['#CA8A04', '#C2410C', '#A8967C'], meaning: 'Stability and grounding energy support your decisions.' },
  metal: { colors: ['Silver White', 'Champagne', 'Ivory'],  hex: ['#E2E8F0', '#F5E6C8', '#FFFFF0'], meaning: 'Clarity and precision sharpen your mind today.' },
  water: { colors: ['Deep Navy', 'Indigo', 'Midnight Blue'],hex: ['#1E3A5F', '#4338CA', '#0F172A'], meaning: 'Wisdom and intuition guide your path forward.' },
}

const LUCKY_NUMBERS: Record<string, number[]> = {
  wood:  [3, 4, 8, 13, 34],
  fire:  [2, 7, 9, 27, 72],
  earth: [5, 10, 50, 15, 25],
  metal: [4, 9, 14, 49, 94],
  water: [1, 6, 11, 16, 61],
}

const LUCKY_DIRECTIONS: Record<string, { dir: string; desc: string }> = {
  wood:  { dir: 'East', desc: 'Face east for important meetings and decisions.' },
  fire:  { dir: 'South', desc: 'South-facing spaces bring warmth and opportunity.' },
  earth: { dir: 'Center', desc: 'Stay grounded — your power is at the center.' },
  metal: { dir: 'West', desc: 'West brings clarity and financial fortune today.' },
  water: { dir: 'North', desc: 'North aligns with your wisdom and career energy.' },
}

const LUCKY_FOODS: Record<string, string[]> = {
  wood:  ['Leafy greens', 'Broccoli', 'Green tea', 'Avocado'],
  fire:  ['Red pepper', 'Tomato', 'Strawberry', 'Pomegranate'],
  earth: ['Sweet potato', 'Honey', 'Ginger', 'Brown rice'],
  metal: ['Pear', 'White rice', 'Tofu', 'Almonds'],
  water: ['Blueberry', 'Black bean', 'Seaweed', 'Walnut'],
}

const LUCKY_CRYSTALS: Record<string, { name: string; benefit: string }> = {
  wood:  { name: 'Green Aventurine', benefit: 'Amplifies growth and new opportunities' },
  fire:  { name: 'Carnelian', benefit: 'Boosts motivation and creative confidence' },
  earth: { name: 'Citrine', benefit: 'Attracts abundance and positive energy' },
  metal: { name: 'Clear Quartz', benefit: 'Sharpens focus and mental clarity' },
  water: { name: 'Lapis Lazuli', benefit: 'Deepens intuition and inner wisdom' },
}

const AFFIRMATIONS: Record<string, string> = {
  wood:  '"I grow through every challenge and embrace new beginnings with confidence."',
  fire:  '"My passion lights the way. I attract success through bold, inspired action."',
  earth: '"I am grounded, stable, and open to receiving abundance in all forms."',
  metal: '"I trust my clarity. I cut through confusion and move with precision."',
  water: '"My intuition is my compass. I flow with wisdom and adapt with grace."',
}

const ELEMENTS = ['wood', 'fire', 'earth', 'metal', 'water']
const ELEMENT_LABELS: Record<string, string> = {
  wood: 'Wood 木', fire: 'Fire 火', earth: 'Earth 土', metal: 'Metal 金', water: 'Water 水',
}
const ELEMENT_EMOJI: Record<string, string> = {
  wood: '🌿', fire: '🔥', earth: '🌍', metal: '⚡', water: '💧',
}

function getTodayElement(): string {
  const now = new Date()
  const dayIndex = now.getDate() + now.getMonth() * 31
  return ELEMENTS[dayIndex % 5]
}

function getHourElement(): string {
  const hour = new Date().getHours()
  const idx = Math.floor(hour / 5) % 5
  return ELEMENTS[idx]
}

export default function LuckyPage() {
  const todayEl = useMemo(() => getTodayElement(), [])
  const hourEl  = useMemo(() => getHourElement(), [])

  const colors    = LUCKY_COLORS[todayEl]
  const numbers   = LUCKY_NUMBERS[todayEl]
  const direction = LUCKY_DIRECTIONS[todayEl]
  const foods     = LUCKY_FOODS[todayEl]
  const crystal   = LUCKY_CRYSTALS[todayEl]
  const affirmation = AFFIRMATIONS[todayEl]

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>

      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Daily Lucky Guide</p>
          <h1 className={styles.title}>Your Lucky Energy<br /><span className={styles.gold}>Today</span></h1>
          <p className={styles.date}>{dateStr}</p>
          <p className={styles.sub}>Refreshed daily at midnight · Based on Five Elements cosmology</p>
        </div>

        {/* Today's Element Banner */}
        <div className={styles.elementBanner}>
          <div className={styles.elementLeft}>
            <span className={styles.elementEmoji}>{ELEMENT_EMOJI[todayEl]}</span>
            <div>
              <p className={styles.elementLabel}>Today's Ruling Element</p>
              <p className={styles.elementName}>{ELEMENT_LABELS[todayEl]}</p>
            </div>
          </div>
          <p className={styles.elementDesc}>{colors.meaning}</p>
        </div>

        {/* Main Grid */}
        <div className={styles.grid}>

          {/* Lucky Colors */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎨</div>
            <h2 className={styles.cardTitle}>Lucky Colors</h2>
            <div className={styles.colorRow}>
              {colors.colors.map((c, i) => (
                <div key={c} className={styles.colorItem}>
                  <div className={styles.colorSwatch} style={{ background: colors.hex[i] }} />
                  <span className={styles.colorName}>{c}</span>
                </div>
              ))}
            </div>
            <p className={styles.cardTip}>Wear or surround yourself with these shades to amplify today's energy.</p>
          </div>

          {/* Lucky Numbers */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>🔢</div>
            <h2 className={styles.cardTitle}>Lucky Numbers</h2>
            <div className={styles.numbersRow}>
              {numbers.map(n => (
                <div key={n} className={styles.numberBadge}>{n}</div>
              ))}
            </div>
            <p className={styles.cardTip}>Use these in decisions, choose them when given options, or look for their patterns today.</p>
          </div>

          {/* Lucky Direction */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>🧭</div>
            <h2 className={styles.cardTitle}>Power Direction</h2>
            <div className={styles.directionWrap}>
              <div className={styles.compass}>
                <span className={styles.compassDir}>{direction.dir}</span>
              </div>
            </div>
            <p className={styles.cardTip}>{direction.desc}</p>
          </div>

          {/* Lucky Foods */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>🍽️</div>
            <h2 className={styles.cardTitle}>Lucky Foods</h2>
            <ul className={styles.foodList}>
              {foods.map(f => (
                <li key={f} className={styles.foodItem}><span className={styles.dot} />  {f}</li>
              ))}
            </ul>
            <p className={styles.cardTip}>Eating aligned foods strengthens your elemental energy for the day.</p>
          </div>

          {/* Crystal */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>💎</div>
            <h2 className={styles.cardTitle}>Power Crystal</h2>
            <p className={styles.crystalName}>{crystal.name}</p>
            <p className={styles.crystalBenefit}>{crystal.benefit}</p>
            <p className={styles.cardTip}>Keep it in your pocket or on your desk to attract today's energy.</p>
          </div>

          {/* Hour Element */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>⏰</div>
            <h2 className={styles.cardTitle}>This Hour's Energy</h2>
            <div className={styles.hourEl}>
              <span className={styles.hourEmoji}>{ELEMENT_EMOJI[hourEl]}</span>
              <span className={styles.hourName}>{ELEMENT_LABELS[hourEl]}</span>
            </div>
            <p className={styles.cardTip}>The current hour runs on {ELEMENT_LABELS[hourEl]} energy. Ideal for: {hourEl === 'wood' ? 'planning and starting new tasks' : hourEl === 'fire' ? 'presentations and creative work' : hourEl === 'earth' ? 'negotiation and team meetings' : hourEl === 'metal' ? 'analysis and financial decisions' : 'reflection and research'}.</p>
          </div>

        </div>

        {/* Affirmation */}
        <div className={styles.affirmation}>
          <p className={styles.affirmLabel}>Today's Affirmation</p>
          <p className={styles.affirmText}>{affirmation}</p>
        </div>

        {/* Unlock CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>Want Personalized Lucky Guidance?</p>
            <h3 className={styles.ctaTitle}>Get your luck forecast based on<br /><span className={styles.gold}>your exact birth chart</span></h3>
            <p className={styles.ctaSub}>The daily guide above is based on the universal day element. Your personal lucky colors, numbers, and timing are calculated from your unique Four Pillars chart — and may differ significantly.</p>
            <div className={styles.ctaBtns}>
              <Link href="/fortune" className={styles.btnPrimary}>Get My Personal Reading — Free →</Link>
              <Link href="/checkout?plan=premium" className={styles.btnGhost}>Unlock Full Annual Lucky Calendar</Link>
            </div>
          </div>
        </div>

        {/* Nav to other free services */}
        <div className={styles.moreServices}>
          <p className={styles.moreLabel}>More Free Services</p>
          <div className={styles.moreGrid}>
            {[
              { href: '/today', icon: '🔮', label: "Today's Fortune" },
              { href: '/tarot', icon: '🃏', label: 'Daily Tarot' },
              { href: '/horoscope', icon: '⭐', label: 'Horoscope' },
              { href: '/compatibility', icon: '💑', label: 'Compatibility' },
              { href: '/dream', icon: '🌙', label: 'Dream Meaning' },
              { href: '/love-hub', icon: '💕', label: 'Love Readings' },
            ].map(s => (
              <Link key={s.href} href={s.href} className={styles.moreCard}>
                <span className={styles.moreIcon}>{s.icon}</span>
                <span className={styles.moreCardLabel}>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

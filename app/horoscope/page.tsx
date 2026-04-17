'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './horoscope.module.css'

const SIGNS = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 – Apr 19', element: 'Fire', planet: 'Mars' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 – May 20', element: 'Earth', planet: 'Venus' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 – Jun 20', element: 'Air', planet: 'Mercury' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 – Jul 22', element: 'Water', planet: 'Moon' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 – Aug 22', element: 'Fire', planet: 'Sun' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 – Sep 22', element: 'Earth', planet: 'Mercury' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 – Oct 22', element: 'Air', planet: 'Venus' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 – Nov 21', element: 'Water', planet: 'Pluto' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21', element: 'Fire', planet: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 – Jan 19', element: 'Earth', planet: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 – Feb 18', element: 'Air', planet: 'Uranus' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 – Mar 20', element: 'Water', planet: 'Neptune' },
]

const HOROSCOPES: Record<string, { weekly: string; monthly: string; love: number; career: number; money: number; health: number; overall: number; advice: string; loveText: string; careerText: string }> = {
  Aries: { weekly: 'Mars ignites your ambition this week. A bold move you\'ve been hesitating over is worth taking now — the window is open. Relationships need honesty, not performance.', monthly: 'April brings a turning point in how you define success. What you thought you wanted is revealing itself as a stepping stone. Career developments mid-month deserve your full attention.', love: 4, career: 5, money: 3, health: 4, overall: 4, advice: 'Act first, refine later. Your instincts are sharper than your doubts.', loveText: 'Directness is your love language this week. Express clearly rather than hinting.', careerText: 'Leadership opportunities appear — step forward before someone else does.' },
  Taurus: { weekly: 'Venus enhances your magnetism this week. Others are drawn to your calm certainty. A financial decision you\'ve been weighing begins to clarify.', monthly: 'Stability you\'ve worked to build begins to pay visible dividends. Don\'t rush to expand — the foundation is what protects everything above it.', love: 5, career: 3, money: 4, health: 4, overall: 4, advice: 'Patience is not passivity. Tending what you have creates more than chasing what you don\'t.', loveText: 'Deep, slow connection is your strength. Don\'t rush — let it deepen naturally.', careerText: 'Reliable execution earns trust this month. Your consistency is noticed.' },
  Gemini: { weekly: 'Mercury sharpens your mind. Communication is effortless this week — use it. A conversation you\'ve been avoiding will resolve better than expected.', monthly: 'Two paths have been appearing for months. This month, a choice crystallizes. Both are valid; what matters is which one feels alive.', love: 3, career: 5, money: 3, health: 3, overall: 4, advice: 'Curiosity is your compass. Follow what genuinely interests you.', loveText: 'Intellectual connection is the spark. Engage their mind first.', careerText: 'New ideas and collaborations are your strongest asset this week.' },
  Cancer: { weekly: 'The Moon\'s influence deepens your intuition. Trust what you feel even if you can\'t explain it. Home and family matter need gentle attention.', monthly: 'Emotional clarity arrives after a period of uncertainty. A relationship — personal or professional — deepens into something genuinely supportive.', love: 5, career: 3, money: 3, health: 5, overall: 4, advice: 'Your sensitivity is a gift, not a burden. Share it with those who deserve it.', loveText: 'Emotional availability is your superpower. Let someone see the real you.', careerText: 'Your empathy creates team harmony others can\'t manufacture.' },
  Leo: { weekly: 'The Sun spotlights your natural authority this week. A creative or leadership project receives recognition. Resist the urge to manage how others see you.', monthly: 'Your confidence is magnetic this month, but authenticity matters more than performance. The opportunity you\'ve been building toward begins to materialize.', love: 4, career: 5, money: 4, health: 4, overall: 5, advice: 'Shine, but leave space for others to shine too. Generosity elevates everything.', loveText: 'Romance flows when you stop performing and simply are. Be genuinely present.', careerText: 'Recognition is coming. Deliver your best work without holding back.' },
  Virgo: { weekly: 'Mercury gives your analytical mind an edge. Details others miss become your advantage. Health routines deserve a thoughtful reset.', monthly: 'Precision and service define your month. What you have been quietly improving finally meets the standard you envisioned. Celebrate this — it is earned.', love: 3, career: 5, money: 4, health: 5, overall: 4, advice: 'Progress over perfection. Done and good is better than perfect and never finished.', loveText: 'Show care through small, thoughtful acts — that\'s your clearest love language.', careerText: 'Your attention to detail solves a problem others haven\'t noticed yet.' },
  Libra: { weekly: 'Venus brings harmony to your social world. A long-standing tension eases. Indecision that has stalled you begins to resolve — one step forward is all you need.', monthly: 'Balance between giving and receiving comes into focus. A partnership — romantic or professional — reaches a new level of mutual understanding.', love: 5, career: 3, money: 3, health: 4, overall: 4, advice: 'Choosing is not losing. Every decision opens a door.', loveText: 'Beauty and fairness matter to you. Create experiences that reflect your values.', careerText: 'Collaboration and diplomacy create breakthroughs others miss.' },
  Scorpio: { weekly: 'Pluto intensifies your powers of perception this week. You see what others are not saying. Use this insight wisely — transformation is underway.', monthly: 'Something long hidden rises to the surface this month. The truth, once seen, cannot be unseen. This is not disruption — it is release.', love: 4, career: 4, money: 5, health: 3, overall: 4, advice: 'Depth is your nature. Don\'t apologize for wanting what\'s real.', loveText: 'Vulnerability with the right person creates the intimacy you deeply want.', careerText: 'Strategic thinking and research give you an edge no one sees coming.' },
  Sagittarius: { weekly: 'Jupiter expands your horizons this week. A learning opportunity or journey presents itself — take it. Philosophically, something clarifies that you\'ve been questioning.', monthly: 'Your optimism is a genuine force this month. A belief you\'ve been quietly nurturing is validated by events. Adventure calls — in the mind if not in geography.', love: 3, career: 4, money: 4, health: 4, overall: 4, advice: 'The journey is the point. Stay curious; don\'t rush to the destination.', loveText: 'Freedom within connection is your need. Find someone who grows with you.', careerText: 'Big-picture thinking attracts collaborators and opportunities this month.' },
  Capricorn: { weekly: 'Saturn rewards your discipline this week. Progress that felt invisible suddenly shows results. A professional relationship deepens into genuine respect.', monthly: 'Ambition aligned with purpose creates sustainable momentum this month. What you\'ve been building with quiet persistence is about to demonstrate its worth.', love: 3, career: 5, money: 5, health: 4, overall: 4, advice: 'Long-term investment — in people, projects, and self — pays off more than any shortcut.', loveText: 'Reliability and commitment are your love gift. Show up consistently.', careerText: 'Your track record opens a door this month. Be ready to walk through it.' },
  Aquarius: { weekly: 'Uranus sparks original thinking this week. An unconventional approach to a stubborn problem proves surprisingly effective. Community matters more than you admit.', monthly: 'Innovation and individuality are your strengths this month. A vision others couldn\'t understand is beginning to demonstrate its logic through results.', love: 4, career: 4, money: 3, health: 4, overall: 4, advice: 'Your uniqueness is your greatest contribution. Don\'t dilute it for acceptance.', loveText: 'Authentic connection over social performance. Seek those who see your vision.', careerText: 'A breakthrough idea arrives — document it immediately and move on it.' },
  Pisces: { weekly: 'Neptune deepens your intuition and creativity this week. Art, music, and dreams carry meaning now. Emotional boundaries deserve a gentle review.', monthly: 'Spiritual and creative work yields unexpected material results this month. The invisible work you do has visible value. Trust what you cannot yet fully see.', love: 5, career: 3, money: 3, health: 4, overall: 4, advice: 'Your imagination is your navigation system. Trust where it leads.', loveText: 'Emotional depth and spiritual connection are your foundations for love.', careerText: 'Creative and intuitive work outperforms pure analysis this week.' },
}

const ELEMENT_COLORS: Record<string, string> = { Fire: '#E8724A', Earth: '#C8A96E', Air: '#88AACC', Water: '#6AAEDD' }

function StarBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 28, height: 5, borderRadius: 3, background: i <= value ? 'var(--gold)' : 'rgba(255,255,255,0.08)' }} />
      ))}
    </div>
  )
}

export default function HoroscopePage() {
  const [selected, setSelected] = useState<typeof SIGNS[0] | null>(null)
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly')
  const h = selected ? HOROSCOPES[selected.name] : null

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Zodiac Horoscope</p>
        <div className={styles.ornament}>⭐</div>
        <h1 className={styles.title}>Your <span className={styles.gold}>Star Sign Reading</span></h1>
        <p className={styles.sub}>Weekly and monthly forecasts for all 12 signs. Select yours below.</p>
      </div>

      {/* Sign Grid */}
      <div className={styles.signGrid}>
        {SIGNS.map(s => (
          <button
            key={s.name}
            className={`${styles.signCard} ${selected?.name === s.name ? styles.signCardActive : ''}`}
            onClick={() => setSelected(s)}
            style={selected?.name === s.name ? { borderColor: ELEMENT_COLORS[s.element] + '88' } : {}}
          >
            <div className={styles.signSymbol} style={{ color: selected?.name === s.name ? ELEMENT_COLORS[s.element] : undefined }}>{s.symbol}</div>
            <div className={styles.signName}>{s.name}</div>
            <div className={styles.signDates}>{s.dates}</div>
          </button>
        ))}
      </div>

      {/* Reading */}
      {selected && h && (
        <div className={styles.reading}>
          {/* Header */}
          <div className={styles.readingHeader}>
            <div className={styles.readingSymbol} style={{ color: ELEMENT_COLORS[selected.element] }}>{selected.symbol}</div>
            <div>
              <h2 className={styles.readingName}>{selected.name}</h2>
              <div className={styles.readingMeta}>
                <span style={{ color: ELEMENT_COLORS[selected.element] }}>{selected.element}</span>
                <span className={styles.sep}>·</span>
                <span>{selected.dates}</span>
                <span className={styles.sep}>·</span>
                <span>Ruled by {selected.planet}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${tab === 'weekly' ? styles.tabActive : ''}`} onClick={() => setTab('weekly')}>This Week</button>
            <button className={`${styles.tab} ${tab === 'monthly' ? styles.tabActive : ''}`} onClick={() => setTab('monthly')}>This Month</button>
          </div>

          {/* Main Text */}
          <div className={styles.mainText}>
            <p>{tab === 'weekly' ? h.weekly : h.monthly}</p>
          </div>

          {/* Scores */}
          <div className={styles.scoresGrid}>
            {[
              { label: '❤ Love', val: h.love, text: h.loveText },
              { label: '💼 Career', val: h.career, text: h.careerText },
              { label: '💰 Money', val: h.money, text: '' },
              { label: '🏥 Health', val: h.health, text: '' },
              { label: '✦ Overall', val: h.overall, text: '' },
            ].map(({ label, val, text }) => (
              <div key={label} className={styles.scoreCard}>
                <div className={styles.scoreLabel}>{label}</div>
                <StarBar value={val} />
                {text && <div className={styles.scoreText}>{text}</div>}
              </div>
            ))}
          </div>

          {/* Advice */}
          <div className={styles.advice}>
            <div className={styles.adviceLabel}>✦ Weekly Wisdom</div>
            <p className={styles.adviceText}>{h.advice}</p>
          </div>
        </div>
      )}

      {!selected && (
        <div className={styles.prompt}>
          <p>Select your sign above to reveal your reading.</p>
        </div>
      )}
    </div>
  )
}

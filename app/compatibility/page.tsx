'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './compatibility.module.css'
import {
  getYearPillar, getDayPillar, getMonthPillar, getElementBalance,
  getDominant, getWeakness, ELEMENT_COLORS, ELEMENT_EMOJI,
  GENERATES, CONTROLS, getCompatibilityScore,
} from '@/lib/sajuCalc'

const ELEMENT_NATURE: Record<string, string> = {
  wood: 'Growth, creativity, ambition, empathy',
  fire: 'Passion, leadership, charisma, intensity',
  earth: 'Stability, loyalty, patience, reliability',
  metal: 'Precision, discipline, justice, clarity',
  water: 'Wisdom, adaptability, depth, intuition',
}

const RELATIONSHIP_INSIGHTS: Record<string, Record<string, { dynamic: string; strength: string; challenge: string }>> = {
  wood: {
    wood: { dynamic: 'Mirror Souls', strength: 'Deep mutual understanding and shared ambitions — you speak the same language without words.', challenge: 'Risk of competing for the same space. Make room for each other\'s growth.' },
    fire: { dynamic: 'Generative Bond', strength: 'Wood feeds fire — your energy amplifies their brilliance. Deeply complementary and exciting.', challenge: 'You may give more than you receive. Ensure the balance is reciprocal.' },
    earth: { dynamic: 'Creative Tension', strength: 'You challenge each other to grow beyond comfort zones. Growth emerges from friction.', challenge: 'Wood controls earth — power dynamics may emerge. Stay conscious of boundaries.' },
    metal: { dynamic: 'Opposing Forces', strength: 'Metal cuts wood, yet pruning enables new growth. This pairing creates discipline from chaos.', challenge: 'Significant friction possible. Conscious effort required to build trust.' },
    water: { dynamic: 'Nourishing Flow', strength: 'Water nourishes wood — they bring depth and calm to your vitality. Deeply nurturing bond.', challenge: 'Their caution may frustrate your momentum. Patience is key.' },
  },
  fire: {
    wood: { dynamic: 'Generative Bond', strength: 'Wood fuels fire — inspiring, energizing, creative partnership with real momentum.', challenge: 'Dependency can form. Ensure independence is maintained.' },
    fire: { dynamic: 'Twin Flames', strength: 'Explosive chemistry and mutual inspiration. Life together is never dull.', challenge: 'Intensity can burn. Both need space and grounding to sustain the flame.' },
    earth: { dynamic: 'Productive Pair', strength: 'Fire creates earth (ash enriches soil). Your energy gives form and direction to their stability.', challenge: 'Pacing differences — they build slow; you ignite fast.' },
    metal: { dynamic: 'Forge & Refine', strength: 'Fire shapes metal into something beautiful. Transformative relationship with lasting impact.', challenge: 'Power clashes can occur. Neither yields easily.' },
    water: { dynamic: 'Opposing Elements', strength: 'Water tempers fire — they bring wisdom and calm. Balance is possible but demands effort.', challenge: 'Natural opposition. Communication and intentionality are essential.' },
  },
  earth: {
    wood: { dynamic: 'Challenge & Growth', strength: 'Opposing natures create a learning relationship — you both grow through difference.', challenge: 'Wood controls earth — watch for dynamics where one feels dominated.' },
    fire: { dynamic: 'Productive Pair', strength: 'Fire energizes earth. Their passion brings warmth to your stability.', challenge: 'Pace mismatch. Slow down or speed up to find your rhythm together.' },
    earth: { dynamic: 'Steady Ground', strength: 'Deep loyalty and stability. A foundation others envy. Built to last.', challenge: 'Risk of stagnation — actively seek new experiences together.' },
    metal: { dynamic: 'Generative Bond', strength: 'Earth produces metal — you naturally support their ambition and clarity. Grounding partnership.', challenge: 'You may feel your contributions go unnoticed. Speak up.' },
    water: { dynamic: 'Container & Flow', strength: 'Earth channels water — you provide structure that gives their depth direction.', challenge: 'Earth controls water — avoid being too restrictive of their emotional expression.' },
  },
  metal: {
    wood: { dynamic: 'Sharp & Growing', strength: 'Metal shapes wood — discipline meets creativity. Structured beauty emerges.', challenge: 'Metal controls wood. Avoid dominating their natural expressiveness.' },
    fire: { dynamic: 'Forged by Heat', strength: 'Fire transforms metal — they bring out depths in you that surprise even yourself.', challenge: 'Intense clashes possible. Both are strong-willed.' },
    earth: { dynamic: 'Supported & Clear', strength: 'Earth grounds metal. Their steadiness gives you room to shine with precision.', challenge: 'You may outpace their decision-making. Patience is a gift here.' },
    metal: { dynamic: 'Two Blades', strength: 'Razor sharp together — shared values, high standards, and mutual respect.', challenge: 'Both can be inflexible. Learn the grace of yielding occasionally.' },
    water: { dynamic: 'Generative Flow', strength: 'Metal produces water — your clarity feeds their wisdom. A beautifully complementary pair.', challenge: 'Their emotional depth may feel overwhelming to your preference for logic.' },
  },
  water: {
    wood: { dynamic: 'Nourishing Bond', strength: 'You nourish wood — supporting their growth brings you deep fulfillment.', challenge: 'You may sacrifice your own needs. Stay anchored in your own direction.' },
    fire: { dynamic: 'Elemental Tension', strength: 'Opposites attract powerfully. Passion and wisdom in constant, electric dialogue.', challenge: 'Natural control dynamic. Requires the most conscious effort of all pairings.' },
    earth: { dynamic: 'Shaped & Flowing', strength: 'Earth gives water form and direction — their grounding makes you more effective.', challenge: 'Earth controls water. Don\'t let practicality override your deeper knowing.' },
    metal: { dynamic: 'Generative Wisdom', strength: 'Metal produces water — they clarify your depth. Intellectual and emotional resonance.', challenge: 'Their directness can feel harsh. Communicate your sensitivity early.' },
    water: { dynamic: 'Deep Waters', strength: 'Profound emotional and intuitive connection. Understands without explaining.', challenge: 'Can spiral into shared anxiety or indecision. Anchor in action sometimes.' },
  },
}

export default function CompatibilityPage() {
  const [form, setForm] = useState({ date1: '', date2: '', name1: 'Person A', name2: 'Person B' })
  const [result, setResult] = useState<null | {
    el1: string; el2: string; dom1: string; dom2: string; score: number; insight: typeof RELATIONSHIP_INSIGHTS['wood']['fire']
    bal1: Record<string, number>; bal2: Record<string, number>
  }>(null)

  function calculate() {
    const [y1, m1, d1] = form.date1.split('-').map(Number)
    const [y2, m2, d2] = form.date2.split('-').map(Number)
    if (!y1 || !y2) return
    const pillars1 = [getYearPillar(y1), getMonthPillar(y1, m1), getDayPillar(y1, m1, d1)]
    const pillars2 = [getYearPillar(y2), getMonthPillar(y2, m2), getDayPillar(y2, m2, d2)]
    const bal1 = getElementBalance(pillars1.map(p => p.element))
    const bal2 = getElementBalance(pillars2.map(p => p.element))
    const dom1 = getDominant(bal1)
    const dom2 = getDominant(bal2)
    const score = getCompatibilityScore(dom1, dom2)
    const insight = RELATIONSHIP_INSIGHTS[dom1]?.[dom2] ?? RELATIONSHIP_INSIGHTS['earth']['earth']
    setResult({ el1: dom1, el2: dom2, dom1, dom2, score, insight, bal1, bal2 })
  }

  const name1 = form.name1 || 'Person A'
  const name2 = form.name2 || 'Person B'

  function scoreColor(s: number) {
    if (s >= 85) return 'var(--jade)'
    if (s >= 70) return 'var(--gold)'
    if (s >= 55) return 'var(--ember)'
    return '#aa4444'
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Compatibility Score</p>
        <div className={styles.ornament}>💑</div>
        <h1 className={styles.title}>Five Elements <span className={styles.gold}>Compatibility</span></h1>
        <p className={styles.sub}>Enter two birth dates to reveal how your elemental energies interact — their harmony, tension, and growth potential.</p>
      </div>

      <div className={styles.body}>
        {/* Form */}
        <div className={styles.formCard}>
          <div className={styles.topLine} />
          <div className={styles.formGrid}>
            <div className={styles.personCol}>
              <div className={styles.personHeader}>
                <div className={styles.personDot} style={{ background: 'var(--ember)' }} />
                <span>First Person</span>
              </div>
              <div className={styles.field}>
                <label>Name / Label</label>
                <input type="text" value={form.name1} onChange={e => setForm(f => ({ ...f, name1: e.target.value }))} placeholder="e.g. Sarah" />
              </div>
              <div className={styles.field}>
                <label>Date of Birth</label>
                <input type="date" value={form.date1} onChange={e => setForm(f => ({ ...f, date1: e.target.value }))} />
              </div>
            </div>

            <div className={styles.vsCol}>💫</div>

            <div className={styles.personCol}>
              <div className={styles.personHeader}>
                <div className={styles.personDot} style={{ background: 'var(--jade)' }} />
                <span>Second Person</span>
              </div>
              <div className={styles.field}>
                <label>Name / Label</label>
                <input type="text" value={form.name2} onChange={e => setForm(f => ({ ...f, name2: e.target.value }))} placeholder="e.g. James" />
              </div>
              <div className={styles.field}>
                <label>Date of Birth</label>
                <input type="date" value={form.date2} onChange={e => setForm(f => ({ ...f, date2: e.target.value }))} />
              </div>
            </div>
          </div>
          <button
            className={styles.calcBtn}
            onClick={calculate}
            disabled={!form.date1 || !form.date2}
          >
            Calculate Compatibility →
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={styles.resultWrap}>
            {/* Score */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreCircle} style={{ borderColor: scoreColor(result.score) }}>
                <div className={styles.scoreNum} style={{ color: scoreColor(result.score) }}>{result.score}</div>
                <div className={styles.scoreLabel}>/ 100</div>
              </div>
              <div className={styles.scoreMeta}>
                <div className={styles.scoreDynamic}>{result.insight.dynamic}</div>
                <div className={styles.scoreDesc}>
                  {result.score >= 85 ? 'Highly harmonious pairing' : result.score >= 70 ? 'Compatible with natural flow' : result.score >= 55 ? 'Growth through difference' : 'Challenging but transformative'}
                </div>
                <div className={styles.scoreElements}>
                  <span style={{ color: ELEMENT_COLORS[result.el1] }}>{ELEMENT_EMOJI[result.el1]} {result.el1}</span>
                  <span className={styles.scoreArrow}>↔</span>
                  <span style={{ color: ELEMENT_COLORS[result.el2] }}>{ELEMENT_EMOJI[result.el2]} {result.el2}</span>
                </div>
              </div>
            </div>

            {/* Element Charts */}
            <div className={styles.chartsGrid}>
              {[
                { name: name1, bal: result.bal1, dom: result.dom1, dotColor: 'var(--ember)' },
                { name: name2, bal: result.bal2, dom: result.dom2, dotColor: 'var(--jade)' },
              ].map(({ name, bal, dom, dotColor }) => (
                <div key={name} className={styles.chartCard}>
                  <div className={styles.chartHeader}>
                    <div className={styles.chartDot} style={{ background: dotColor }} />
                    <div className={styles.chartName}>{name}</div>
                    <div className={styles.chartDom} style={{ color: ELEMENT_COLORS[dom] }}>
                      {ELEMENT_EMOJI[dom]} {dom} dominant
                    </div>
                  </div>
                  <div className={styles.chartBars}>
                    {Object.entries(bal).map(([el, count]) => (
                      <div key={el} className={styles.chartRow}>
                        <div className={styles.chartEl} style={{ color: ELEMENT_COLORS[el] }}>{ELEMENT_EMOJI[el]} {el}</div>
                        <div className={styles.chartBarWrap}>
                          <div className={styles.chartBarFill} style={{ width: `${(count / 3) * 100}%`, background: ELEMENT_COLORS[el] }} />
                        </div>
                        <div className={styles.chartCount}>{count}</div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.chartNature}>{ELEMENT_NATURE[dom]}</div>
                </div>
              ))}
            </div>

            {/* Insight */}
            <div className={styles.insightCard}>
              <h3 className={styles.insightTitle}>Relationship Insight: {result.insight.dynamic}</h3>
              <div className={styles.insightGrid}>
                <div className={styles.insightBox + ' ' + styles.insightStrength}>
                  <div className={styles.insightLabel}>✓ Strength</div>
                  <p>{result.insight.strength}</p>
                </div>
                <div className={styles.insightBox + ' ' + styles.insightChallenge}>
                  <div className={styles.insightLabel}>⚠ Challenge</div>
                  <p>{result.insight.challenge}</p>
                </div>
              </div>
            </div>

            {/* Element Relationship */}
            <div className={styles.elemRelCard}>
              <div className={styles.elemRelLabel}>Element Relationship</div>
              {GENERATES[result.el1] === result.el2 && <p className={styles.elemRelText}><strong>{name1}</strong>'s {result.el1} generates {name2}'s {result.el2} — a naturally nurturing and supportive dynamic.</p>}
              {GENERATES[result.el2] === result.el1 && <p className={styles.elemRelText}><strong>{name2}</strong>'s {result.el2} generates {name1}'s {result.el1} — they naturally energize and support you.</p>}
              {CONTROLS[result.el1] === result.el2 && <p className={styles.elemRelText}><strong>{name1}</strong>'s {result.el1} controls {result.el2} — conscious awareness of power dynamics is important.</p>}
              {CONTROLS[result.el2] === result.el1 && <p className={styles.elemRelText}><strong>{name2}</strong>'s {result.el2} controls {result.el1} — be mindful of where influence becomes pressure.</p>}
              {result.el1 === result.el2 && <p className={styles.elemRelText}>Matching elements — deep mutual understanding, though echo chambers may form. Seek complementary input.</p>}
            </div>

            <div className={styles.deepenCta}>
              <p>For a full compatibility report with month-by-month analysis and relationship timing</p>
              <Link href="/checkout?plan=premium" className={styles.deepenBtn}>Unlock Deep Report →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './calendar.module.css'
import { getYearPillar, getMonthPillar, getDayPillar, ELEMENT_COLORS, ELEMENT_EMOJI } from '@/lib/sajuCalc'

const SOLAR_TERMS: Record<number, Record<number, string>> = {
  2: { 4: 'Start of Spring', 19: 'Rain Water' },
  3: { 6: 'Awakening of Insects', 21: 'Spring Equinox' },
  4: { 5: 'Clear and Bright', 20: 'Grain Rain' },
  5: { 6: 'Start of Summer', 21: 'Grain Buds' },
  6: { 6: 'Grain in Ear', 21: 'Summer Solstice' },
  7: { 7: 'Minor Heat', 23: 'Major Heat' },
  8: { 7: 'Start of Autumn', 23: 'End of Heat' },
  9: { 8: 'White Dew', 23: 'Autumnal Equinox' },
  10: { 8: 'Cold Dew', 23: "Frost's Descent" },
  11: { 7: 'Start of Winter', 22: 'Minor Snow' },
  12: { 7: 'Major Snow', 22: 'Winter Solstice' },
  1: { 6: 'Minor Cold', 20: 'Major Cold' },
}

const AUSPICIOUS_ELEMENTS: Record<string, string[]> = {
  wood: ['Starting new ventures', 'Planting & gardening', 'Signing agreements', 'Creative work'],
  fire: ['Presentations & launches', 'Social gatherings', 'Weddings', 'Artistic projects'],
  earth: ['Construction & moves', 'Legal matters', 'Funerals & ancestors', 'Long-term investments'],
  metal: ['Haircuts & cutting', 'Financial decisions', 'Negotiations', 'Removing obstacles'],
  water: ['Travel', 'Learning & research', 'Meditation', 'Healing & rest'],
}

const CAUTIONS: Record<string, string[]> = {
  wood: ['Major metal-related work', 'Cutting down trees'],
  fire: ['Starting construction', 'Water-related activities'],
  earth: ['Digging foundations', 'Water drainage work'],
  metal: ['Wood cutting projects', 'Starting new creative ventures'],
  water: ['Fire-related ceremonies', 'Making permanent decisions'],
}

export default function CalendarPage() {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const [dateStr, setDateStr] = useState(todayStr)
  const [result, setResult] = useState<null | ReturnType<typeof calcDate>>(null)

  function calcDate(ds: string) {
    const [y, m, d] = ds.split('-').map(Number)
    const yp = getYearPillar(y)
    const mp = getMonthPillar(y, m)
    const dp = getDayPillar(y, m, d)
    const solarTerm = SOLAR_TERMS[m]?.[d] ?? null
    const dayOfWeek = new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long' })
    const auspicious = AUSPICIOUS_ELEMENTS[dp.element] ?? []
    const cautions = CAUTIONS[dp.element] ?? []
    return { yp, mp, dp, solarTerm, dayOfWeek, auspicious, cautions, element: dp.element, date: `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]} ${d}, ${y}` }
  }

  function handleLookup() {
    if (!dateStr) return
    setResult(calcDate(dateStr))
  }

  const todayResult = calcDate(todayStr)

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Ten Thousand Year Calendar</p>
        <div className={styles.ornament}>📅</div>
        <h1 className={styles.title}>Heavenly Stems & <span className={styles.gold}>Earthly Branches</span></h1>
        <p className={styles.sub}>Look up any date's cosmic energy — pillars, solar terms, and auspicious activities.</p>
      </div>

      <div className={styles.body}>
        {/* Lookup Form */}
        <div className={styles.lookupCard}>
          <div className={styles.topLine} />
          <div className={styles.lookupRow}>
            <div className={styles.field}>
              <label>Select Any Date</label>
              <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} min="1900-01-01" max="2100-12-31" />
            </div>
            <button className={styles.lookupBtn} onClick={handleLookup}>Look Up →</button>
          </div>
          <div className={styles.todayLink}>
            <button className={styles.linkBtn} onClick={() => { setDateStr(todayStr); setResult(calcDate(todayStr)) }}>Use today ({todayResult.date})</button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={styles.resultWrap}>
            {/* Header */}
            <div className={styles.resultHeader}>
              <div className={styles.resultDate}>{result.dayOfWeek}, {result.date}</div>
              {result.solarTerm && (
                <div className={styles.solarBadge}>☯ {result.solarTerm}</div>
              )}
            </div>

            {/* 3 Pillars */}
            <div className={styles.pillarsGrid}>
              {[
                { label: 'Year Pillar', p: result.yp },
                { label: 'Month Pillar', p: result.mp },
                { label: 'Day Pillar', p: result.dp },
              ].map(({ label, p }) => (
                <div key={label} className={styles.pillarCard} style={{ borderColor: ELEMENT_COLORS[p.element] + '44' }}>
                  <div className={styles.pillarLabel}>{label}</div>
                  <div className={styles.pillarStem} style={{ color: ELEMENT_COLORS[p.element] }}>{p.stemHanja}</div>
                  <div className={styles.pillarStemRom}>{p.stem}</div>
                  <div className={styles.pillarDivider} />
                  <div className={styles.pillarBranch}>{p.branchHanja}</div>
                  <div className={styles.pillarBranchRom}>{p.branch}</div>
                  <div className={styles.pillarElement} style={{ color: ELEMENT_COLORS[p.element] }}>
                    {ELEMENT_EMOJI[p.element]} {p.element}
                  </div>
                </div>
              ))}
            </div>

            {/* Day Element Summary */}
            <div className={styles.dayElement} style={{ borderColor: ELEMENT_COLORS[result.element] + '55' }}>
              <div className={styles.dayElementLeft}>
                <div style={{ fontSize: '32px' }}>{ELEMENT_EMOJI[result.element]}</div>
                <div>
                  <div className={styles.dayElementLabel}>Day Element</div>
                  <div className={styles.dayElementName} style={{ color: ELEMENT_COLORS[result.element] }}>
                    {result.element.charAt(0).toUpperCase() + result.element.slice(1)}
                  </div>
                </div>
              </div>
              {result.yp.zodiac && (
                <div className={styles.zodiacBadge}>Year of the {result.yp.zodiac}</div>
              )}
            </div>

            {/* Auspicious / Caution */}
            <div className={styles.actionsGrid}>
              <div className={styles.auspCard}>
                <h3 className={styles.auspTitle}>✓ Auspicious Activities</h3>
                <ul className={styles.auspList}>
                  {result.auspicious.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div className={styles.cautionBox}>
                <h3 className={styles.cautionTitle}>⚠ Avoid Today</h3>
                <ul className={styles.cautionList}>
                  {result.cautions.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Prompt before lookup */}
        {!result && (
          <div className={styles.promptBox}>
            <p>Select a date above and press <strong>Look Up</strong> to reveal its cosmic energy.</p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './fortune.module.css'

type Pillar = {
  stem: string; stemHanja: string
  branch: string; branchHanja: string
  element: string; zodiac?: string
} | null

type DetailBlock = { tags: string[]; body: string; lock: string }

type IlganProfile = {
  title: string; personality: string; strength: string
  weakness: string; love: string; career: string; health: string
  loveDetail: DetailBlock | null
  wealthDetail: DetailBlock | null
  healthDetail: DetailBlock | null
}

type LifePeriod = { early: string; middle: string; late: string; wealth: string }
type MonthlyItem = { month: number; fortune: string; level: number; sipsin?: string }

type ElementBlock = {
  emoji: string
  keyword: string
  strong: { traits: string[]; desc: string; shadow: string }
  weak: { traits: string[]; desc: string; tip: string }
} | null

type DayMasterStrength = { score: number; label: string; labelEn: string; isStrong: boolean }
type LuckPillar = { stemHanja: string; branchHanja: string; stem: string; branch: string; element: string; ageStart: number; ageEnd: number }
type LuckPillarsResult = { startAge: number; isForward: boolean; pillars: LuckPillar[] }
type BranchInteractions = { harmony: string[]; clash: string[]; harm: string[]; punishment: string[] }
type HiddenStems = { year: string[]; month: string[]; day: string[]; hour: string[] }
type YongshinResult = {
  primary: string; secondary: string; avoid: string
  method: string; reasoning: string
  luckyColors: string[]; luckyDirections: string[]; luckyNumbers: string[]
}
type GyeokgukResult = {
  key: string; name: string; nameEn: string
  description: string; strengths: string[]; challenges: string[]
}
type JohuResult = {
  season: string; seasonKor: string; tendency: string
  neededElement: string; avoidElement: string; note: string
}

type SajuResult = {
  pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar }
  analysis: {
    zodiac: string; gender: string
    dominantElement: string; weaknessElement: string; dominantColor: string
    balance: Record<string, number>; todayFortune: string; ilgan: string; ilganHanja?: string
    ilganProfile: IlganProfile | null
    dominantProfile: ElementBlock
    weaknessProfile: ElementBlock
    lifePeriod: LifePeriod
    monthly: MonthlyItem[]
    sipsinLabels?: Record<string, string | null>
    hiddenStems?: HiddenStems
    interactions?: BranchInteractions
    dayMasterStrength?: DayMasterStrength
    luckPillars?: LuckPillarsResult
    annualSipsin?: string
    currentYearStem?: string
    currentYearBranch?: string
    yongshin?: YongshinResult
    gyeokguk?: GyeokgukResult
    johu?: JohuResult
  }
}

// Fixed: use English element keys to match API response
const ELEMENT_COLOR_MAP: Record<string, string> = {
  wood: '#6BAE76', fire: '#E8724A', earth: '#C8A96E', metal: '#AAAACC', water: '#6AAEDD',
}
const ELEMENT_EMOJI: Record<string, string> = {
  wood: '🌿', fire: '🔥', earth: '🌍', metal: '⚡', water: '💧',
}
const PILLAR_LABELS = ['Year', 'Month', 'Day', 'Hour']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function FortuneClient({ isAdmin = false }: { isAdmin?: boolean }) {
  const params = useSearchParams()
  const router = useRouter()
  const [result, setResult] = useState<SajuResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const date = params.get('date') || ''
  const gender = params.get('gender') || '여성'
  const hour = params.get('hour') || ''
  const calendar = params.get('calendar') || '양력'

  useEffect(() => {
    if (!date) { router.replace('/today'); return }
    fetch('/api/saju', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ birthdate: date, gender, hourKey: hour, calendar }),
    })
      .then(r => r.json())
      .then(data => { if (data.error) setError(data.error); else setResult(data) })
      .catch(() => setError('분석 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false))
  }, [date, gender, hour, router])

  if (loading) return <LoadingView />
  if (error || !result) return <ErrorView message={error} />

  const { pillars, analysis } = result
  const pillarList = [pillars.year, pillars.month, pillars.day, pillars.hour]

  return (
    <main className={styles.page}>

      {/* ─ 헤더 ─ */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>✦ Free Four Pillars Reading ✦</p>
        <h1 className={styles.name}>{gender} · {calendar} {date.replace(/-/g, '.')}</h1>
        <p className={styles.zodiac}>
          Year of the <span>{analysis.zodiac}</span> · Day Master <span>{analysis.ilgan}</span>
        </p>
      </div>

      {/* ─ 사주 원국 ─ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Four Pillars Chart</h2>

        {/* Day Master strength badge */}
        {analysis.dayMasterStrength && (
          <div className={styles.dmStrengthBadge}>
            <span className={styles.dmStrengthLabel}>Day Master Strength</span>
            <span
              className={styles.dmStrengthValue}
              style={{ color: analysis.dayMasterStrength.isStrong ? '#6BAE76' : '#E8724A' }}
            >
              {analysis.dayMasterStrength.labelEn} — {analysis.dayMasterStrength.label}
            </span>
            <span className={styles.dmStrengthNote}>
              Score {analysis.dayMasterStrength.score} / 10
            </span>
          </div>
        )}

        <div className={styles.pillarsGrid}>
          {pillarList.map((p, i) => {
            const stemLabel = [
              analysis.sipsinLabels?.yearStem,
              analysis.sipsinLabels?.monthStem,
              analysis.sipsinLabels?.dayStem,
              analysis.sipsinLabels?.hourStem,
            ][i]
            const branchLabel = [
              analysis.sipsinLabels?.yearBranch,
              analysis.sipsinLabels?.monthBranch,
              analysis.sipsinLabels?.dayBranch,
              analysis.sipsinLabels?.hourBranch,
            ][i]
            const hiddenArr = analysis.hiddenStems
              ? [analysis.hiddenStems.year, analysis.hiddenStems.month, analysis.hiddenStems.day, analysis.hiddenStems.hour][i]
              : []
            return p ? (
              <div key={i} className={styles.pillarCard}>
                <div className={styles.pillarLabel}>{PILLAR_LABELS[i]}</div>
                {stemLabel && (
                  <div className={styles.pillarSipsin}>{stemLabel}</div>
                )}
                <div className={styles.pillarStem} style={{ color: ELEMENT_COLOR_MAP[p.element] }}>{p.stemHanja}</div>
                <div className={styles.pillarStemKor}>{p.stem}</div>
                <div className={styles.pillarDivider} />
                <div className={styles.pillarBranch}>{p.branchHanja}</div>
                <div className={styles.pillarBranchKor}>{p.branch}</div>
                {branchLabel && (
                  <div className={styles.pillarSipsinBranch}>{branchLabel}</div>
                )}
                {hiddenArr && hiddenArr.length > 0 && (
                  <div className={styles.pillarHidden} title="Hidden Stems">
                    {hiddenArr.join(' ')}
                  </div>
                )}
                {i === 0 && p.zodiac && <div className={styles.pillarZodiac}>Year of {p.zodiac}</div>}
              </div>
            ) : (
              <div key={i} className={`${styles.pillarCard} ${styles.pillarUnknown}`}>
                <div className={styles.pillarLabel}>{PILLAR_LABELS[i]}</div>
                <div className={styles.unknownText}>Hour unknown</div>
              </div>
            )
          })}
        </div>

        {/* Branch interactions */}
        {analysis.interactions && (
          (() => {
            const { harmony, clash, harm, punishment } = analysis.interactions
            const hasAny = harmony.length + clash.length + harm.length + punishment.length > 0
            return hasAny ? (
              <div className={styles.interactionsRow}>
                {harmony.length > 0 && (
                  <div className={styles.interactionGroup}>
                    <span className={styles.interactionIcon}>✦</span>
                    <span className={styles.interactionLabel} style={{ color: '#6BAE76' }}>합 (Harmony)</span>
                    <span className={styles.interactionItems}>{harmony.join(' · ')}</span>
                  </div>
                )}
                {clash.length > 0 && (
                  <div className={styles.interactionGroup}>
                    <span className={styles.interactionIcon}>⚡</span>
                    <span className={styles.interactionLabel} style={{ color: '#E8724A' }}>충 (Clash)</span>
                    <span className={styles.interactionItems}>{clash.join(' · ')}</span>
                  </div>
                )}
                {harm.length > 0 && (
                  <div className={styles.interactionGroup}>
                    <span className={styles.interactionIcon}>⚠</span>
                    <span className={styles.interactionLabel} style={{ color: '#AAAACC' }}>해 (Harm)</span>
                    <span className={styles.interactionItems}>{harm.join(' · ')}</span>
                  </div>
                )}
                {punishment.length > 0 && (
                  <div className={styles.interactionGroup}>
                    <span className={styles.interactionIcon}>◈</span>
                    <span className={styles.interactionLabel} style={{ color: '#C8A96E' }}>형 (Punishment)</span>
                    <span className={styles.interactionItems}>{punishment.join(' · ')}</span>
                  </div>
                )}
              </div>
            ) : null
          })()
        )}
      </section>

      {/* ─ 나의 기운 프로필 ─ */}
      {analysis.dominantProfile && analysis.weaknessProfile && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Energy Profile</h2>
          <EnergyProfile
            dominant={analysis.dominantElement}
            weakness={analysis.weaknessElement}
            dominantProfile={analysis.dominantProfile}
            weaknessProfile={analysis.weaknessProfile}
          />
        </section>
      )}

      {/* ─ 일간 기질 분석 ─ */}
      {analysis.ilganProfile && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Day Master Character</h2>
          <div className={styles.profileCard}>
            <div className={styles.profileTitle}>{analysis.ilganProfile.title}</div>
            <p className={styles.profileText}>{analysis.ilganProfile.personality}</p>
            <div className={styles.profileGrid}>
              <div className={styles.profileItem}>
                <div className={styles.profileItemLabel}>✦ Strengths</div>
                <p>{analysis.ilganProfile.strength}</p>
              </div>
              <div className={styles.profileItem}>
                <div className={styles.profileItemLabel}>⚠ Watch Out</div>
                <p>{analysis.ilganProfile.weakness}</p>
              </div>
              <div className={styles.profileItem}>
                <div className={styles.profileItemLabel}>💕 Love & Relations</div>
                <p>{analysis.ilganProfile.love}</p>
              </div>
              <div className={styles.profileItem}>
                <div className={styles.profileItemLabel}>💼 Ideal Careers</div>
                <p>{analysis.ilganProfile.career}</p>
              </div>
              <div className={`${styles.profileItem} ${styles.profileSpan2}`}>
                <div className={styles.profileItemLabel}>🏥 Health Watch</div>
                <p>{analysis.ilganProfile.health}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─ 연애·인연 분석 ─ */}
      {analysis.ilganProfile?.loveDetail && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💕 Love & Connection</h2>
          <DetailSection
            data={analysis.ilganProfile.loveDetail}
            lockLabel="Want to know more?"
            accentColor="var(--ember)"
            isAdmin={isAdmin}
          />
        </section>
      )}

      {/* ─ 재물·직업 에너지 ─ */}
      {analysis.ilganProfile?.wealthDetail && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💰 Wealth & Career Energy</h2>
          <DetailSection
            data={analysis.ilganProfile.wealthDetail}
            lockLabel="Want to know more?"
            accentColor="var(--gold)"
            isAdmin={isAdmin}
          />
        </section>
      )}

      {/* ─ 건강·체질 분석 ─ */}
      {analysis.ilganProfile?.healthDetail && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🏥 Health & Constitution</h2>
          <DetailSection
            data={analysis.ilganProfile.healthDetail}
            lockLabel="Want to know more?"
            accentColor="var(--jade)"
            isAdmin={isAdmin}
          />
        </section>
      )}

      {/* ─ 오행 분포 ─ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Five Elements Distribution</h2>
        <div className={styles.elementGrid}>
          {Object.entries(analysis.balance).map(([el, count]) => (
            <div key={el} className={styles.elementCard}>
              <div className={styles.elementEmoji}>{ELEMENT_EMOJI[el]}</div>
              <div className={styles.elementName} style={{ color: ELEMENT_COLOR_MAP[el] }}>{el}</div>
              <div className={styles.elementBar}>
                <div className={styles.elementBarFill} style={{ width: `${(count / 4) * 100}%`, background: ELEMENT_COLOR_MAP[el] }} />
              </div>
              <div className={styles.elementCount}>{count}</div>
            </div>
          ))}
        </div>
        <div className={styles.elementSummary}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Dominant</div>
            <div className={styles.summaryValue} style={{ color: ELEMENT_COLOR_MAP[analysis.dominantElement] }}>
              {ELEMENT_EMOJI[analysis.dominantElement]} {analysis.dominantElement}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Needs Balance</div>
            <div className={styles.summaryValue} style={{ color: ELEMENT_COLOR_MAP[analysis.weaknessElement] }}>
              {ELEMENT_EMOJI[analysis.weaknessElement]} {analysis.weaknessElement}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Lucky Color</div>
            <div className={styles.summaryValue} style={{ fontSize: '15px', color: 'var(--gold)' }}>{analysis.dominantColor}</div>
          </div>
        </div>
      </section>

      {/* ─ 초년·중년·말년운 ─ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Life Flow — Early · Mid · Later Years</h2>
        <div className={styles.lifePeriods}>
          <div className={styles.lifePeriodCard}>
            <div className={styles.lifePeriodBadge}>Early Years</div>
            <div className={styles.lifePeriodAge}>0s – 30s</div>
            <p className={styles.lifePeriodText}>{analysis.lifePeriod.early}</p>
          </div>
          <div className={styles.lifePeriodCard}>
            <div className={styles.lifePeriodBadge} style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>Mid Years</div>
            <div className={styles.lifePeriodAge}>30s – 60s</div>
            <p className={styles.lifePeriodText}>{analysis.lifePeriod.middle}</p>
          </div>
          <div className={styles.lifePeriodCard}>
            <div className={styles.lifePeriodBadge} style={{ borderColor: 'var(--jade)', color: 'var(--jade)' }}>Later Years</div>
            <div className={styles.lifePeriodAge}>60s onward</div>
            <p className={styles.lifePeriodText}>{analysis.lifePeriod.late}</p>
          </div>
        </div>
        <div className={styles.wealthCard}>
          <div className={styles.wealthLabel}>💰 Wealth Fortune</div>
          <p className={styles.wealthText}>{analysis.lifePeriod.wealth}</p>
        </div>
      </section>

      {/* ─ 격국 (Chart Pattern) ─ */}
      {analysis.gyeokguk && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Chart Pattern</h2>
          <div className={styles.gyeokgukCard}>
            <div className={styles.gyeokgukHeader}>
              <span className={styles.gyeokgukName}>{analysis.gyeokguk.name}</span>
              <span className={styles.gyeokgukNameEn}>{analysis.gyeokguk.nameEn}</span>
            </div>
            <p className={styles.gyeokgukDesc}>{analysis.gyeokguk.description}</p>
            <div className={styles.gyeokgukStrengthsWrap}>
              <div className={styles.gyeokgukCol}>
                <div className={styles.gyeokgukColLabel} style={{ color: 'var(--jade)' }}>✦ Strengths</div>
                <ul className={styles.gyeokgukList}>
                  {analysis.gyeokguk.strengths.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div className={styles.gyeokgukCol}>
                <div className={styles.gyeokgukColLabel} style={{ color: 'var(--ember)' }}>⚠ Challenges</div>
                <ul className={styles.gyeokgukList}>
                  {analysis.gyeokguk.challenges.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─ 용신 (Favorable Element) ─ */}
      {analysis.yongshin && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Favorable Element</h2>
          <div className={styles.yongshinCard}>
            <div className={styles.yongshinMethod}>{analysis.yongshin.method}</div>
            <div className={styles.yongshinElements}>
              <div className={styles.yongshinEl}>
                <div className={styles.yongshinElLabel}>Primary</div>
                <div
                  className={styles.yongshinElValue}
                  style={{ color: ELEMENT_COLOR_MAP[analysis.yongshin.primary] ?? 'var(--gold)' }}
                >
                  {ELEMENT_EMOJI[analysis.yongshin.primary]} {analysis.yongshin.primary}
                </div>
              </div>
              <div className={styles.yongshinEl}>
                <div className={styles.yongshinElLabel}>Supporting</div>
                <div
                  className={styles.yongshinElValue}
                  style={{ color: ELEMENT_COLOR_MAP[analysis.yongshin.secondary] ?? 'var(--text-mid)' }}
                >
                  {ELEMENT_EMOJI[analysis.yongshin.secondary]} {analysis.yongshin.secondary}
                </div>
              </div>
              <div className={styles.yongshinEl}>
                <div className={styles.yongshinElLabel}>Avoid</div>
                <div
                  className={styles.yongshinElValue}
                  style={{ color: ELEMENT_COLOR_MAP[analysis.yongshin.avoid] ?? '#888', opacity: 0.7 }}
                >
                  {ELEMENT_EMOJI[analysis.yongshin.avoid]} {analysis.yongshin.avoid}
                </div>
              </div>
            </div>
            <p className={styles.yongshinReasoning}>{analysis.yongshin.reasoning}</p>
            <div className={styles.yongshinLucky}>
              <div className={styles.yongshinLuckyRow}>
                <span className={styles.yongshinLuckyLabel}>Lucky Colors</span>
                <span className={styles.yongshinLuckyVal}>{analysis.yongshin.luckyColors.join(' · ')}</span>
              </div>
              <div className={styles.yongshinLuckyRow}>
                <span className={styles.yongshinLuckyLabel}>Lucky Directions</span>
                <span className={styles.yongshinLuckyVal}>{analysis.yongshin.luckyDirections.join(' · ')}</span>
              </div>
              <div className={styles.yongshinLuckyRow}>
                <span className={styles.yongshinLuckyLabel}>Lucky Numbers</span>
                <span className={styles.yongshinLuckyVal}>{analysis.yongshin.luckyNumbers.join(' · ')}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─ 조후 (Seasonal Balance) ─ */}
      {analysis.johu && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Seasonal Balance</h2>
          <div className={styles.johuCard}>
            <div className={styles.johuHeader}>
              <span className={styles.johuSeason}>{analysis.johu.seasonKor}</span>
              <span
                className={styles.johuTendency}
                style={{
                  color: analysis.johu.tendency.includes('hot') ? '#E8724A'
                    : analysis.johu.tendency.includes('cold') ? '#6AAEDD'
                    : 'var(--gold)'
                }}
              >
                {analysis.johu.tendency}
              </span>
            </div>
            <div className={styles.johuElements}>
              <div className={styles.johuEl}>
                <span className={styles.johuElLabel}>Needs</span>
                <span
                  className={styles.johuElValue}
                  style={{ color: ELEMENT_COLOR_MAP[analysis.johu.neededElement] ?? 'var(--jade)' }}
                >
                  {ELEMENT_EMOJI[analysis.johu.neededElement]} {analysis.johu.neededElement}
                </span>
              </div>
              <div className={styles.johuEl}>
                <span className={styles.johuElLabel}>Avoid</span>
                <span
                  className={styles.johuElValue}
                  style={{ color: ELEMENT_COLOR_MAP[analysis.johu.avoidElement] ?? 'var(--ember)', opacity: 0.7 }}
                >
                  {ELEMENT_EMOJI[analysis.johu.avoidElement]} {analysis.johu.avoidElement}
                </span>
              </div>
            </div>
            <p className={styles.johuNote}>{analysis.johu.note}</p>
          </div>
        </section>
      )}

      {/* ─ 올해 총운 ─ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>This Year's Energy</h2>
        <div className={styles.todayCard}>
          <div className={styles.todayQuote}>❝</div>
          <p className={styles.todayText}>{analysis.todayFortune}</p>
          <div className={styles.todayQuoteEnd}>❞</div>
        </div>
      </section>

      {/* ─ 월별 운세 ─ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Monthly Fortune Flow</h2>
        {analysis.annualSipsin && analysis.currentYearStem && (
          <p className={styles.monthlyNote}>
            This year ({analysis.currentYearStem}{analysis.currentYearBranch ?? ''} Year) brings{' '}
            <strong style={{ color: 'var(--gold)' }}>{analysis.annualSipsin}</strong> energy to your chart.
            Monthly readings below are calibrated to your Day Master.
          </p>
        )}
        <div className={styles.monthlyGrid}>
          {analysis.monthly.map(m => (
            <div key={m.month} className={styles.monthlyCard}>
              <div className={styles.monthlyName}>{MONTH_NAMES[m.month - 1]}</div>
              {m.sipsin && (
                <div className={styles.monthlySipsin}>{m.sipsin}</div>
              )}
              <div className={styles.monthlyBars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`${styles.monthlyBar} ${i < m.level ? styles.monthlyBarActive : ''}`} />
                ))}
              </div>
              <p className={styles.monthlyText}>{m.fortune}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─ 대운 (Luck Pillars) ─ */}
      {analysis.luckPillars && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Major Luck Cycles</h2>
          <p className={styles.luckPillarsNote}>
            Your luck pillar cycle begins at age <strong>{analysis.luckPillars.startAge}</strong>,
            running {analysis.luckPillars.isForward ? 'forward (順行)' : 'backward (逆行)'} from your birth month pillar.
            Each pillar governs a 10-year chapter of your life.
          </p>
          <div className={styles.luckPillarsGrid}>
            {analysis.luckPillars.pillars.map((lp, i) => {
              const color = ELEMENT_COLOR_MAP[lp.element] ?? 'var(--gold)'
              const isNow = new Date().getFullYear() - parseInt(date.split('-')[0]) >= lp.ageStart &&
                            new Date().getFullYear() - parseInt(date.split('-')[0]) <= lp.ageEnd
              return (
                <div key={i} className={`${styles.luckPillarCard} ${isNow ? styles.luckPillarActive : ''}`}>
                  {isNow && <div className={styles.luckPillarNow}>Current</div>}
                  <div className={styles.luckAge}>Age {lp.ageStart}–{lp.ageEnd}</div>
                  <div className={styles.luckStem} style={{ color }}>{lp.stemHanja}</div>
                  <div className={styles.luckDivider} />
                  <div className={styles.luckBranch}>{lp.branchHanja}</div>
                  <div className={styles.luckName} style={{ color, fontSize: '10px' }}>{lp.element}</div>
                </div>
              )
            })}
          </div>
          {!isAdmin && <div className={styles.luckLockBox}>
            <div className={styles.luckLockInner}>
              <span>🔒</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Full Luck Pillar Analysis</div>
                <p style={{ fontSize: '13px', color: 'var(--text-mid)', margin: 0 }}>
                  Detailed interpretation of each 10-year cycle — wealth, love, career, and health timing for every pillar.
                </p>
              </div>
              <button
                className="btn-primary"
                style={{ flexShrink: 0, fontSize: '13px', padding: '10px 18px' }}
                onClick={() => router.push('/checkout?plan=premium')}
              >
                Unlock Premium
              </button>
            </div>
          </div>}
        </section>
      )}

      {/* ─ Premium CTA ─ */}
      <section className={styles.upsellSection}>
        <div className={styles.upsellCard}>
          <div className={styles.upsellTopLine} />
          <p className={styles.upsellEyebrow}>Premium Report</p>
          <h3 className={styles.upsellTitle}>Ready to go deeper?</h3>
          <p className={styles.upsellDesc}>
            Your 10-year major cycle, the exact timing wealth enters your life,<br />
            love & marriage windows — all in a 40-page precision PDF.
          </p>
          <div className={styles.upsellFeatures}>
            {['Monthly wealth, love, career & health analysis', '10-year major cycle roadmap', 'Lucky element detailed guide', 'Expert commentary PDF included'].map(f => (
              <div key={f} className={styles.upsellFeature}>
                <span className={styles.upsellCheck}>✦</span> {f}
              </div>
            ))}
          </div>
          <div className={styles.upsellButtons}>
            <button className="btn-primary btn-large" style={{ minWidth: '200px' }} onClick={() => router.push('/checkout?plan=premium')}>Annual Report — $7.99/mo</button>
            <Link href="/" className="btn-ghost btn-large" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const ELEMENT_COLOR: Record<string, string> = {
  wood: '#6BAE76', fire: '#E8724A', earth: '#C8A96E', metal: '#AAAACC', water: '#6AAEDD',
}

function EnergyProfile({
  dominant,
  weakness,
  dominantProfile,
  weaknessProfile,
}: {
  dominant: string
  weakness: string
  dominantProfile: NonNullable<ElementBlock>
  weaknessProfile: NonNullable<ElementBlock>
}) {
  const domColor = ELEMENT_COLOR[dominant] ?? 'var(--gold)'
  const weakColor = ELEMENT_COLOR[weakness] ?? 'var(--text-dim)'

  return (
    <div className={styles.energyWrap}>
      {/* 강한 기운 / 부족한 기운 2분할 */}
      <div className={styles.energyGrid}>
        {/* 강한 기운 */}
        <div className={styles.energyCard} style={{ borderColor: domColor + '55' }}>
          <div className={styles.energyBadge} style={{ background: domColor + '22', color: domColor }}>
            Dominant Energy
          </div>
          <div className={styles.energyTitle}>
            <span style={{ fontSize: '28px' }}>{dominantProfile.emoji}</span>
            <div>
              <div className={styles.energyElement} style={{ color: domColor }}>{dominant}</div>
              <div className={styles.energyKeyword}>{dominantProfile.keyword}</div>
            </div>
          </div>
          <div className={styles.energyTraits}>
            {dominantProfile.strong.traits.map(t => (
              <span key={t} className={styles.energyTrait} style={{ borderColor: domColor + '66', color: domColor }}>{t}</span>
            ))}
          </div>
          <p className={styles.energyDesc}>{dominantProfile.strong.desc}</p>
          <div className={styles.energyShadow}>
            <span className={styles.shadowLabel}>⚠ Shadow Side</span>
            <p>{dominantProfile.strong.shadow}</p>
          </div>
        </div>

        {/* 부족한 기운 */}
        <div className={styles.energyCard} style={{ borderColor: weakColor + '44' }}>
          <div className={styles.energyBadge} style={{ background: weakColor + '18', color: weakColor }}>
            Needs Balance
          </div>
          <div className={styles.energyTitle}>
            <span style={{ fontSize: '28px' }}>{weaknessProfile.emoji}</span>
            <div>
              <div className={styles.energyElement} style={{ color: weakColor }}>{weakness}</div>
              <div className={styles.energyKeyword}>{weaknessProfile.keyword}</div>
            </div>
          </div>
          <div className={styles.energyTraits}>
            {weaknessProfile.weak.traits.map(t => (
              <span key={t} className={styles.energyTrait} style={{ borderColor: weakColor + '55', color: weakColor }}>{t}</span>
            ))}
          </div>
          <p className={styles.energyDesc}>{weaknessProfile.weak.desc}</p>
          <div className={styles.energyTip}>
            <span className={styles.tipLabel}>💡 Balancing Tip</span>
            <p>{weaknessProfile.weak.tip}</p>
          </div>
        </div>
      </div>

      {/* 균형 요약 바 */}
      <div className={styles.energyBalance}>
        <div className={styles.balanceLabel}>Energy Balance</div>
        <div className={styles.balanceBar}>
          <div className={styles.balanceLeft} style={{ background: domColor }}>
            {dominant} excess
          </div>
          <div className={styles.balanceMid}>⇄</div>
          <div className={styles.balanceRight} style={{ background: weakColor }}>
            {weakness} low
          </div>
        </div>
        <p className={styles.balanceDesc}>
          When you channel your strong {dominant} energy wisely while consciously cultivating {weakness}, life finds its natural balance.
        </p>
      </div>
    </div>
  )
}

function DetailSection({
  data,
  lockLabel,
  accentColor,
  isAdmin = false,
}: {
  data: { tags: string[]; body: string; lock: string }
  lockLabel: string
  accentColor: string
  isAdmin?: boolean
}) {
  return (
    <div className={styles.detailCard}>
      <div className={styles.detailTags}>
        {data.tags.map(tag => (
          <span key={tag} className={styles.detailTag} style={{ borderColor: accentColor, color: accentColor }}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.detailBody}>
        {data.body.split('\n\n').map((para, i) => (
          <p key={i} className={styles.detailPara}>{para}</p>
        ))}
      </div>
      {!isAdmin && (
        <div className={styles.detailLock}>
          <div className={styles.detailLockInner}>
            <span className={styles.lockIcon}>🔒</span>
            <div>
              <div className={styles.lockLabel}>{lockLabel}</div>
              <p className={styles.lockText}>{data.lock}</p>
            </div>
            <button className="btn-primary" style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '13px', padding: '10px 20px' }} onClick={() => window.location.href = '/checkout?plan=premium'}>
              Unlock Premium
            </button>
          </div>
        </div>
      )}
      {isAdmin && (
        <div style={{ marginTop: 12, padding: '6px 12px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 6, fontSize: 11, color: 'var(--gold)', display: 'inline-block' }}>
          ✦ Admin Preview — hidden from users
        </div>
      )}
    </div>
  )
}

function LoadingView() {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loadingSymbol}>☯</div>
      <p className={styles.loadingText}>Reading your chart...</p>
    </div>
  )
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className={styles.loadingWrap}>
      <p style={{ color: 'var(--ember)', fontSize: '15px' }}>{message || 'Something went wrong. Please try again.'}</p>
      <Link href="/" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}>Try Again</Link>
    </div>
  )
}

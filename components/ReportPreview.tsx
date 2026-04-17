'use client'
import { useRouter } from 'next/navigation'
import ScrollReveal from './ScrollReveal'
import styles from './ReportPreview.module.css'

export default function ReportPreview() {
  const router = useRouter()
  return (
    <section className={styles.section} id="reports">
      <div className="section-wrap">
        <div className={styles.layout}>
          <ScrollReveal>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>✦ Annual Fortune Report · 2026 Bing-Wu Year</span>
                  <span className={styles.cardBadge}>PREMIUM</span>
                </div>
                <div className={styles.pillars}>
                  {[
                    { hanja: '甲', cls: styles.wood, label: 'Year · Stem' },
                    { hanja: '丙', cls: styles.fire, label: 'Month · Stem' },
                    { hanja: '戊', cls: styles.earth, label: 'Day · Stem' },
                    { hanja: '壬', cls: styles.water, label: 'Hour · Stem' },
                  ].map((p) => (
                    <div key={p.label} className={styles.pillar}>
                      <div className={`${styles.hanja} ${p.cls}`}>{p.hanja}</div>
                      <div className={styles.pillarLabel}>{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Day Master</span>
                  <span className={styles.rowValue}>Wù Tǔ 戊土 — The Mountain, grounding force</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Chart Strength</span>
                  <span className={styles.rowValue}>Strong chart · Wealth element weak</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Year Summary</span>
                  <span className={`${styles.rowValue} ${styles.jade}`}>A turning point where change meets growth</span>
                </div>

                <div className={styles.lockedWrap}>
                  <div className={styles.locked}>
                    <div className={styles.row}><span className={styles.rowLabel}>Wealth Detail</span><span className={styles.rowValue}>March & September key months — watch investments</span></div>
                    <div className={styles.row}><span className={styles.rowLabel}>Love & Relations</span><span className={styles.rowValue}>New connection possible in May, caution in August</span></div>
                    <div className={styles.row}><span className={styles.rowLabel}>Career & Business</span><span className={styles.rowValue}>Strong first half — avoid signing contracts in July</span></div>
                    <div className={styles.row}><span className={styles.rowLabel}>Health Watch</span><span className={styles.rowValue}>Digestive health — attention in June & October</span></div>
                  </div>
                  <div className={styles.lockOverlay}>
                    <div className={styles.lockIcon}>🔒</div>
                    <div className={styles.lockText}>Unlock full report with Premium</div>
                    <button className="btn-primary" style={{ fontSize: '12px', padding: '8px 20px', marginTop: '4px' }} onClick={() => router.push('/checkout?plan=premium')}>
                      Unlock Report — $29.99
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className={styles.textSide}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                <p className="section-eyebrow">Report System</p>
                <div className="ornament-divider" style={{ justifyContent: 'flex-start' }}>
                  <span className="ornament-symbol">✦</span>
                </div>
                <h2 className="section-title">40 pages of <span className="gold">precision insight</span></h2>
              </div>

              <div className={styles.features}>
                {[
                  { title: 'Monthly Fortune Graph', desc: 'Visualize the flow of wealth, relationships, health & career across all 12 months' },
                  { title: '10-Year Major Cycle Map', desc: 'Your current position in the grand 10-year cycle — see the full arc of your life' },
                  { title: 'Lucky Element Guide', desc: 'Colors, directions, numbers, career sectors, and relationship strategies that work for you' },
                  { title: 'PDF Download', desc: 'Save and print anytime. Full classical Four Pillars commentary included — share with family' },
                ].map((f) => (
                  <div key={f.title} className={styles.feature}>
                    <div className={styles.featureDot} />
                    <div className={styles.featureText}>
                      <strong>{f.title}</strong> — {f.desc}
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary btn-large" onClick={() => router.push('/checkout?plan=premium')}>Preview Report Free →</button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

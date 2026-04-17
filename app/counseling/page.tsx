'use client'
import Link from 'next/link'
import styles from './counseling.module.css'

const WHAT_TO_EXPECT = [
  { icon: '🎯', title: 'Personalized Session', desc: 'Your reading is based solely on your birth chart — no scripts, no generic advice.' },
  { icon: '💬', title: 'Chat, Phone, or Video', desc: 'Choose the format that feels most comfortable. Sessions can be recorded on request.' },
  { icon: '🔒', title: 'Confidential', desc: 'Everything shared in your session stays private. We never store session content.' },
  { icon: '📋', title: 'Written Summary', desc: 'Receive a written follow-up with your key insights after the session.' },
]

const TOPICS = [
  'Career & Life Direction', 'Love & Compatibility', 'Marriage Timing', 'Wealth & Business Cycles',
  'Health & Wellbeing', 'Family Dynamics', 'Major Life Decisions', 'Auspicious Date Selection',
]

export default function CounselingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <div className={styles.navLinks}>
          <Link href="/#free-services">Free Reading</Link>
          <Link href="/#pricing">Plans</Link>
          <Link href="/signin" className={styles.navCta}>Sign In</Link>
        </div>
      </nav>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Expert Consultation</p>
        <div className={styles.ornament}><span>☽</span></div>
        <h1 className={styles.title}>Live 1:1 <span className={styles.gold}>Consultation</span></h1>
        <p className={styles.sub}>
          Go beyond the chart. Book a private session with a Four Pillars practitioner for personalized, in-depth guidance on your most important questions.
        </p>
      </div>

      {/* Coming soon notice */}
      <div className={styles.comingSoonWrap}>
        <div className={styles.comingSoonCard}>
          <div className={styles.comingSoonIcon}>🌙</div>
          <h2 className={styles.comingSoonTitle}>Consultants Being Onboarded</h2>
          <p className={styles.comingSoonDesc}>
            We are currently reviewing and verifying practitioners to join the MINGYUN consultation roster.
            All consultants are individually assessed before going live — we do not list anyone unverified.
          </p>
          <p className={styles.comingSoonDesc}>
            Leave your email below and we will notify you as soon as 1:1 sessions become available.
          </p>
          <form className={styles.notifyForm} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className={styles.notifyInput} required />
            <button type="submit" className={styles.notifyBtn}>Notify Me →</button>
          </form>
          <p className={styles.notifyNote}>No spam. One email when consultations go live.</p>
        </div>
      </div>

      {/* What to expect */}
      <div className={styles.expectSection}>
        <div className={styles.expectLabel}>What to Expect</div>
        <div className={styles.expectGrid}>
          {WHAT_TO_EXPECT.map(w => (
            <div key={w.title} className={styles.expectCard}>
              <div className={styles.expectIcon}>{w.icon}</div>
              <div className={styles.expectTitle}>{w.title}</div>
              <div className={styles.expectDesc}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className={styles.topicsSection}>
        <div className={styles.topicsLabel}>Topics Covered</div>
        <div className={styles.topicsList}>
          {TOPICS.map(t => (
            <span key={t} className={styles.topicTag}>{t}</span>
          ))}
        </div>
      </div>

      {/* Consultant application CTA */}
      <div className={styles.applyBanner}>
        <div className={styles.applyLeft}>
          <div className={styles.applyTitle}>Are you a Four Pillars practitioner?</div>
          <p className={styles.applySub}>We welcome applications from experienced practitioners. All applicants are reviewed individually.</p>
        </div>
        <Link href="/partner" className={styles.applyBtn}>Apply to Consult →</Link>
      </div>
    </div>
  )
}

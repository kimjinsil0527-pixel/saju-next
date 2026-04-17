'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './partner.module.css'

const OPPORTUNITIES = [
  { icon: '🔮', title: 'Consultant Roster', desc: 'Join our verified consultation roster. We are onboarding practitioners ahead of our 1:1 session launch.' },
  { icon: '✍️', title: 'Content Partnership', desc: 'Co-produce articles, readings, or features on wellness, spirituality, and self-discovery.' },
  { icon: '🏷️', title: 'Brand Integration', desc: 'Thoughtful, non-intrusive sponsorship within our reading experience. Wellness brands only.' },
  { icon: '⚙️', title: 'API Access', desc: 'Enterprise access to our Four Pillars calculation engine for wellness and astrology platforms.' },
]

const STATS = [
  { num: '25+', label: 'Reading Types' },
  { num: '80+', label: 'Dream Symbols' },
  { num: '100%', label: 'Free to Start' },
  { num: '0', label: 'Ads or Spam' },
]

export default function PartnerPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Home</Link>
      </nav>

      <div className={styles.wrap}>
        {/* Hero */}
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Business</p>
          <h1 className={styles.title}>Partner with <span className={styles.gold}>MINGYUN</span></h1>
          <p className={styles.sub}>A new platform built on classical Four Pillars methodology. We are growing — and looking for the right partners to grow with.</p>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {STATS.map(s => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Opportunities */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Partnership Types</div>
          <div className={styles.oppGrid}>
            {OPPORTUNITIES.map(o => (
              <div key={o.title} className={styles.oppCard}>
                <div className={styles.oppIcon}>{o.icon}</div>
                <div className={styles.oppTitle}>{o.title}</div>
                <div className={styles.oppDesc}>{o.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultant Requirements */}
        <div className={styles.requireBox}>
          <div className={styles.requireTitle}>Consultant Application Requirements</div>
          <ul className={styles.requireList}>
            <li>Documented certification or lineage in Four Pillars / Bazi or related tradition</li>
            <li>Minimum 5 years of active practice</li>
            <li>Sample readings submitted for accuracy evaluation</li>
            <li>Professional code of ethics commitment</li>
            <li>English fluency required; additional languages a plus</li>
          </ul>
        </div>

        {/* Application Form */}
        <div className={styles.formCard}>
          <div className={styles.topLine} />
          {submitted ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>✦</div>
              <div className={styles.successTitle}>Application Received</div>
              <p className={styles.successDesc}>Thank you for your interest. We review all applications and typically respond within 3 business days. We&apos;ll be in touch at the email you provided.</p>
              <Link href="/" className={styles.successBack}>← Return Home</Link>
            </div>
          ) : (
            <>
              <div className={styles.formTitle}>Submit a Partnership Inquiry</div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Partnership Type *</label>
                  <select
                    required
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  >
                    <option value="">Select a type...</option>
                    <option value="consultant">Consultant Roster Application</option>
                    <option value="content">Content Partnership</option>
                    <option value="brand">Brand Integration / Sponsorship</option>
                    <option value="api">API / Enterprise Access</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Tell us about yourself / your proposal *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Share your background, experience, or partnership idea..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>Submit Application →</button>
                <p className={styles.formNote}>We respond to all inquiries within 3 business days.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './love-hub.module.css'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'free', label: 'Free' },
  { id: 'single', label: 'For Singles' },
  { id: 'current', label: 'Current Relationship' },
  { id: 'future', label: 'Future & Soulmate' },
  { id: 'breakup', label: 'Breakup & Healing' },
  { id: 'deep', label: 'Deep Insight' },
]

const READINGS = [
  // FREE
  {
    id: 'daily-love',
    cat: 'free',
    icon: '💫',
    badge: 'Free · Daily',
    badgeColor: 'jade',
    title: "Today's Love Energy",
    desc: "Your love fortune score for today — attraction energy, emotional openness, and the best time to connect.",
    credit: 0,
    href: '/today',
    tag: 'Refreshed daily',
  },
  {
    id: 'love-element',
    cat: 'free',
    icon: '☯️',
    badge: 'Free',
    badgeColor: 'jade',
    title: 'Love Element Profile',
    desc: "Which of the Five Elements governs your romantic energy? Understand how you love and what you need in a partner.",
    credit: 0,
    href: '/#hero',
    tag: 'Based on your chart',
  },
  {
    id: 'basic-compat',
    cat: 'free',
    icon: '💑',
    badge: 'Free',
    badgeColor: 'jade',
    title: 'Basic Compatibility Check',
    desc: "Enter two birth dates and get an instant Five Elements compatibility score between 0–100.",
    credit: 0,
    href: '/compatibility',
    tag: 'Instant result',
  },
  {
    id: 'daily-tarot',
    cat: 'free',
    icon: '🃏',
    badge: 'Free · 1 card/day',
    badgeColor: 'jade',
    title: 'Daily Love Tarot',
    desc: "One tarot card drawn for your love life today. A clear, direct message for where you are right now.",
    credit: 0,
    href: '/tarot',
    tag: 'Major Arcana',
  },

  // FOR SINGLES
  {
    id: 'when-love-s',
    cat: 'single',
    icon: '📅',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'When Will Love Arrive?',
    desc: "Exactly when does your chart show a new romantic connection entering? Based on your 10-year cycle and current annual energy.",
    credit: 12,
    href: '/love-hub/when-love',
    tag: 'Timing prediction',
  },
  {
    id: 'ideal-partner',
    cat: 'single',
    icon: '🎯',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'My Ideal Partner Profile',
    desc: "Your chart carries a blueprint of who you're elementally drawn to. Get a detailed profile — personality type, industry, lifestyle — of your most compatible match.",
    credit: 12,
    href: '/love-hub/ideal-partner',
    tag: 'Your love blueprint',
  },
  {
    id: 'my-love-style',
    cat: 'single',
    icon: '🪞',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'My Love Style Analysis',
    desc: "How do you actually show up in love? Your attachment style, romantic blind spots, and what partners consistently experience with you.",
    credit: 10,
    href: '/love-hub/my-love-style',
    tag: 'Self-awareness',
  },
  {
    id: 'love-blockers',
    cat: 'single',
    icon: '🚧',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'What\'s Blocking My Love Life?',
    desc: "Is something in your chart suppressing romantic connection? Identify the exact elemental obstacle — and when it lifts.",
    credit: 10,
    href: '/love-hub/love-blockers',
    tag: 'Why love delays',
  },
  {
    id: 'secret-admirer',
    cat: 'single',
    icon: '🫣',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'Is Someone Secretly in Love With Me?',
    desc: "Your chart shows incoming romantic energy before it surfaces. Find out if someone in your world is carrying unexpressed feelings for you.",
    credit: 8,
    href: '/love-hub/secret-admirer',
    tag: 'Incoming energy',
  },
  {
    id: 'magnetic-timing',
    cat: 'single',
    icon: '✨',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'When Am I Most Magnetic This Year?',
    desc: "Your attraction energy peaks and dips with your elemental cycles. Get your top 3 high-magnetism months and the windows to avoid for new beginnings.",
    credit: 8,
    href: '/love-hub/magnetic-timing',
    tag: 'Peak timing',
  },
  {
    id: 'toxic-pattern',
    cat: 'single',
    icon: '🔁',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Why Do I Keep Meeting the Same Person?',
    desc: "Different names, same relationship. Your chart carries the exact elemental reason — and the specific shift that breaks the cycle.",
    credit: 10,
    href: '/love-hub/toxic-pattern',
    tag: 'Pattern breaking',
  },
  {
    id: 'first-meeting',
    cat: 'single',
    icon: '🌷',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'Blind Date & First Meeting Energy',
    desc: "What does the energy between your charts suggest about this first meeting? Chemistry type, first impression, and whether to pursue.",
    credit: 8,
    href: '/love-hub/first-meeting',
    tag: 'Blind date reading',
  },

  // CURRENT LOVE
  {
    id: 'new-couple',
    cat: 'current',
    icon: '🌹',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'New Relationship Reading',
    desc: "You just started seeing someone. Is this going somewhere? Get clarity on compatibility, early-stage chemistry, and whether this connection has long-term potential.",
    credit: 8,
    href: '/love-hub/new-couple',
    tag: 'Most popular',
  },
  {
    id: 'crush',
    cat: 'current',
    icon: '💌',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'Crush & One-Sided Love',
    desc: "You have feelings — but do they? Find out if your crush has romantic interest in you, and the best timing to confess or make a move.",
    credit: 8,
    href: '/love-hub/crush',
    tag: 'Confession timing',
  },
  {
    id: 'dating',
    cat: 'current',
    icon: '✨',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'Dating & Almost-There Stage',
    desc: "You're in the \"talking\" phase — will it become official? Understand the energy between you and get the timing for the relationship to naturally progress.",
    credit: 8,
    href: '/love-hub/dating',
    tag: 'Relationship timing',
  },
  {
    id: 'relationship-dive',
    cat: 'current',
    icon: '💞',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Relationship Deep Dive',
    desc: "For established couples. Explore your dynamic, hidden tensions, emotional needs, and what each of you truly wants from this relationship.",
    credit: 15,
    href: '/love-hub/relationship-dive',
    tag: 'Full chart comparison',
  },
  {
    id: 'conflict',
    cat: 'current',
    icon: '⚡',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'Love Conflict Forecast',
    desc: "When will tensions peak? When will things flow? Get a 12-month conflict and harmony forecast based on both of your charts.",
    credit: 12,
    href: '/love-hub/conflict',
    tag: '12-month forecast',
  },
  {
    id: 'long-distance',
    cat: 'current',
    icon: '✈️',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Long Distance Love',
    desc: "Can long-distance survive? Analyze the endurance energy of your connection and find the ideal timing to close the distance.",
    credit: 10,
    href: '/love-hub/long-distance',
    tag: 'Endurance analysis',
  },
  {
    id: 'age-gap',
    cat: 'current',
    icon: '🕰️',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Age Gap Relationship',
    desc: "Age gaps bring different elemental energies into play. Understand the generational energy clash and how to make it work.",
    credit: 10,
    href: '/love-hub/age-gap',
    tag: 'Generational energy',
  },
  {
    id: 'office-romance',
    cat: 'current',
    icon: '🏢',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Office Romance Reading',
    desc: "Feelings for a coworker? Find out if the energy is mutual, whether it's worth the risk, and how to navigate the situation.",
    credit: 10,
    href: '/love-hub/office-romance',
    tag: 'Risk & reward',
  },
  {
    id: 'love-language',
    cat: 'current',
    icon: '🗣️',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'Love Language by Saju',
    desc: "How does your partner express and receive love according to their chart? Stop guessing — understand their emotional blueprint.",
    credit: 12,
    href: '/love-hub/love-language',
    tag: 'Partner analysis',
  },
  {
    id: 'marriage-stability',
    cat: 'current',
    icon: '🏛️',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'Will This Relationship Lead to Marriage?',
    desc: "Is marriage actually on this path? Analyze both charts for commitment timing, long-term endurance, and what needs to happen for it to go the distance.",
    credit: 12,
    href: '/love-hub/marriage-stability',
    tag: 'Commitment path',
  },
  {
    id: 'partner-true-feelings',
    cat: 'current',
    icon: '💭',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: "What Does My Partner Really Feel?",
    desc: "What they say vs. what their chart says. Understand your partner's true emotional state, what they need but won't express, and where this is heading.",
    credit: 12,
    href: '/love-hub/partner-true-feelings',
    tag: 'Partner insight',
  },
  {
    id: 'cohabitation',
    cat: 'current',
    icon: '🏠',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Should We Move In Together?',
    desc: "Cohabitation reveals what no date can. Find out if your elemental types are compatible for daily life — and what the #1 friction point will be.",
    credit: 10,
    href: '/love-hub/cohabitation',
    tag: 'Living together',
  },

  // FUTURE & SOULMATE
  {
    id: 'soulmate',
    cat: 'future',
    icon: '🌟',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Soulmate Profile',
    desc: "What does your destined person look like? Get a detailed profile — approximate age range, personality type, industry, physical energy, and when they enter your life.",
    credit: 15,
    href: '/love-hub/soulmate',
    tag: 'Most requested',
  },
  {
    id: 'when-love',
    cat: 'future',
    icon: '📅',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'When Will Love Arrive?',
    desc: "If you're single, this tells you the most likely window when a significant romantic connection enters your life — based on your 10-year cycle and annual energy.",
    credit: 12,
    href: '/love-hub/when-love',
    tag: 'Timing prediction',
  },
  {
    id: 'marriage-timing',
    cat: 'future',
    icon: '💍',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Marriage Timing',
    desc: "When is your most auspicious window for marriage? Which years carry the strongest marriage energy in your chart? Includes ideal age ranges.",
    credit: 15,
    href: '/love-hub/marriage-timing',
    tag: 'Auspicious years',
  },
  {
    id: 'wedding-date',
    cat: 'future',
    icon: '🌸',
    badge: '★ 25 credits',
    badgeColor: 'gold',
    title: 'Wedding Date Selection',
    desc: "Choose the most auspicious wedding date based on both partners' charts. Avoid elemental clashes on the most important day of your life.",
    credit: 25,
    href: '/love-hub/wedding-date',
    tag: 'Both charts analyzed',
  },
  {
    id: 'twin-flame',
    cat: 'future',
    icon: '🔥',
    badge: '★ 20 credits',
    badgeColor: 'gold',
    title: 'Twin Flame Reading',
    desc: "Is your current partner your twin flame or a karmic connection? Understand the soul-level purpose of your most intense relationship.",
    credit: 20,
    href: '/love-hub/twin-flame',
    tag: 'Soul connection',
  },
  {
    id: 'past-life-love',
    cat: 'future',
    icon: '🌀',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Past Life Love Reading',
    desc: "Were you connected to someone in a past life? Explore karmic ties that shape your most profound — and sometimes most painful — relationships.",
    credit: 15,
    href: '/love-hub/past-life-love',
    tag: 'Karmic connection',
  },
  {
    id: 'family-approval',
    cat: 'future',
    icon: '👨‍👩‍👧',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'Family Approval Energy',
    desc: "How will your family respond to your partner? Analyze the energy between your partner's chart and your family's collective energy.",
    credit: 12,
    href: '/love-hub/family-approval',
    tag: 'Family dynamics',
  },

  // BREAKUP & HEALING
  {
    id: 'breakup',
    cat: 'breakup',
    icon: '💔',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Breakup Analysis',
    desc: "Understand why it ended. Your Four Pillars chart often carries the root cause of relationship patterns — see what yours reveals about this breakup.",
    credit: 10,
    href: '/love-hub/breakup',
    tag: 'Root cause reading',
  },
  {
    id: 'ex-return',
    cat: 'breakup',
    icon: '🔄',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'Will They Come Back?',
    desc: "Is reconciliation energetically possible? Get an honest assessment of whether your ex is likely to return and during which time window.",
    credit: 12,
    href: '/love-hub/ex-return',
    tag: 'Reconciliation timing',
  },
  {
    id: 'move-on',
    cat: 'breakup',
    icon: '🌅',
    badge: '★ 10 credits',
    badgeColor: 'gold',
    title: 'Moving On & New Love',
    desc: "When will you be emotionally ready — and when will the next significant person enter your life? Find your healing and renewal window.",
    credit: 10,
    href: '/love-hub/move-on',
    tag: 'Healing timeline',
  },
  {
    id: 'remarriage',
    cat: 'breakup',
    icon: '🌻',
    badge: '★ 12 credits',
    badgeColor: 'gold',
    title: 'Love After Divorce or Long-Term Heartbreak',
    desc: "After a major ending — where are you in your recovery cycle, when will love genuinely re-open, and what does the next chapter of your love life look like?",
    credit: 12,
    href: '/love-hub/remarriage',
    tag: 'New beginning',
  },
  {
    id: 'closure',
    cat: 'breakup',
    icon: '🕊️',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'Closure Reading',
    desc: "What do you need to release to heal completely? Get a chart-based reading on the emotional patterns keeping you tied to the past.",
    credit: 8,
    href: '/love-hub/closure',
    tag: 'Emotional release',
  },

  // DEEP INSIGHT
  {
    id: 'third-party',
    cat: 'deep',
    icon: '👁️',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Is There Someone Else?',
    desc: "The question you're afraid to ask. Examine your partner's chart for signs of divided romantic energy — and whether your instincts are tracking something real.",
    credit: 15,
    href: '/love-hub/third-party',
    tag: 'Relationship integrity',
  },
  {
    id: 'full-compat',
    cat: 'deep',
    icon: '📋',
    badge: '★ 25 credits',
    badgeColor: 'gold',
    title: 'Full Compatibility Report',
    desc: "The most comprehensive couples analysis available. 40-page PDF covering all five elemental interactions, conflict timing, ideal communication styles, and long-term potential.",
    credit: 25,
    href: '/love-hub/full-compat',
    tag: '40-page PDF',
  },
  {
    id: 'loyalty',
    cat: 'deep',
    icon: '🛡️',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Loyalty & Trust Reading',
    desc: "Does your partner's chart show signs of commitment or wandering energy? An honest elemental analysis of faithfulness and long-term devotion.",
    credit: 15,
    href: '/love-hub/loyalty',
    tag: 'Commitment analysis',
  },
  {
    id: 'love-triangle',
    cat: 'deep',
    icon: '🔺',
    badge: '★ 15 credits',
    badgeColor: 'gold',
    title: 'Love Triangle Reading',
    desc: "Torn between two people? Compare the elemental compatibility and karmic weight of both connections to find the clearer path.",
    credit: 15,
    href: '/love-hub/love-triangle',
    tag: 'Two-path comparison',
  },
  {
    id: 'friend-to-love',
    cat: 'deep',
    icon: '🌱',
    badge: '★ 8 credits',
    badgeColor: 'gold',
    title: 'Friendship to Romance',
    desc: "You've been friends — could it become more? Analyze whether the elemental energy supports a transition from friendship into romantic love.",
    credit: 8,
    href: '/love-hub/friend-to-love',
    tag: 'Transition potential',
  },
  {
    id: 'biz-partner',
    cat: 'deep',
    icon: '🤝',
    badge: '★ 20 credits',
    badgeColor: 'gold',
    title: 'Business Partner Compatibility',
    desc: "Mixing love and business? Or wondering if your partner's energy aligns with your professional goals? Get a dual-layer compatibility reading.",
    credit: 20,
    href: '/love-hub/biz-partner',
    tag: 'Love + career',
  },
]

export default function LoveHub() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? READINGS
    : READINGS.filter(r => r.cat === activeTab)

  const totalCount = READINGS.length

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>UNMYUNG</Link>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>

      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Love & Relationships</p>
          <h1 className={styles.title}>Every Question<br />About <span className={styles.rose}>Love</span></h1>
          <p className={styles.sub}>
            {totalCount} free relationship previews · Detailed personalized readings are in development
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.tabs}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`${styles.tab} ${activeTab === c.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Readings Grid */}
        <div className={styles.grid}>
          {filtered.map(r => (
            <Link key={r.id} href={r.href} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{r.icon}</span>
                <span className={`${styles.badge} ${styles[`badge_${r.badgeColor}`]}`}>
                  Free Preview
                </span>
              </div>
              {r.tag && <span className={styles.tag}>{r.tag}</span>}
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardDesc}>{r.desc}</p>
              <div className={styles.cardCta}>
                <span className={styles.ctaFree}>View Free Preview →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.bottomCta}>
          <p className={styles.bottomCtaEyebrow}>Personalized Readings</p>
          <h3 className={styles.bottomCtaTitle}>Detailed Love Hub readings are still in development</h3>
          <p className={styles.bottomCtaSub}>The previews above remain available for free.</p>
        </div>
      </div>
    </div>
  )
}

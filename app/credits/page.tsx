'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './credits.module.css'

const PACKS = [
  { id: 'starter',  credits: 10,  price: 1.99,  label: 'Starter',  perCredit: '0.20', popular: false, bonus: null },
  { id: 'basic',    credits: 30,  price: 4.99,  label: 'Basic',    perCredit: '0.17', popular: false, bonus: null },
  { id: 'popular',  credits: 80,  price: 9.99,  label: 'Popular',  perCredit: '0.12', popular: true,  bonus: '+10 bonus' },
  { id: 'value',    credits: 200, price: 19.99, label: 'Value',    perCredit: '0.10', popular: false, bonus: '+30 bonus' },
  { id: 'pro',      credits: 500, price: 39.99, label: 'Pro',      perCredit: '0.08', popular: false, bonus: '+100 bonus' },
]

const WHAT_YOU_CAN_BUY = [
  { icon: '💌', name: 'Crush Reading',          credits: 8,  cat: 'Love' },
  { icon: '🌹', name: 'New Relationship',        credits: 8,  cat: 'Love' },
  { icon: '💞', name: 'Relationship Deep Dive',  credits: 15, cat: 'Love' },
  { icon: '🌟', name: 'Soulmate Profile',        credits: 15, cat: 'Love' },
  { icon: '💍', name: 'Marriage Timing',         credits: 15, cat: 'Love' },
  { icon: '🔄', name: 'Ex Return Reading',       credits: 12, cat: 'Love' },
  { icon: '💔', name: 'Breakup Analysis',        credits: 10, cat: 'Love' },
  { icon: '🃏', name: 'Love Tarot 3-Card',       credits: 5,  cat: 'Tarot' },
  { icon: '🎴', name: 'Celtic Cross 10-Card',    credits: 15, cat: 'Tarot' },
  { icon: '🌀', name: 'Past Life Reading',       credits: 15, cat: 'Spiritual' },
  { icon: '👶', name: 'Name Analysis',           credits: 30, cat: 'Special' },
  { icon: '🗓️', name: 'Auspicious Date',        credits: 20, cat: 'Special' },
  { icon: '📋', name: 'Full Compatibility PDF',  credits: 25, cat: 'Reports' },
  { icon: '📊', name: 'Annual Fortune PDF',      credits: 50, cat: 'Reports' },
  { icon: '💰', name: 'Wealth Timing Analysis',  credits: 15, cat: 'Fortune' },
  { icon: '⚡', name: 'Saju Sal Analysis',       credits: 10, cat: 'Fortune' },
]

const MEMBERSHIP_CREDITS = [
  { plan: 'Free',            credits: 0,   color: 'muted' },
  { plan: 'Premium Monthly', credits: 30,  color: 'jade' },
  { plan: 'Premium Annual',  credits: 80,  color: 'gold' },
]

export default function CreditsPage() {
  const [selected, setSelected] = useState('popular')
  const router = useRouter()

  const selectedPack = PACKS.find(p => p.id === selected)!

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
          <p className={styles.eyebrow}>Star Credits</p>
          <h1 className={styles.title}>Buy once, use<br /><span className={styles.gold}>whenever you want</span></h1>
          <p className={styles.sub}>Credits never expire · Use across all readings · No subscription required</p>
        </div>

        {/* Pack Selector */}
        <div className={styles.packsSection}>
          <div className={styles.packsGrid}>
            {PACKS.map(p => (
              <button
                key={p.id}
                className={`${styles.pack} ${selected === p.id ? styles.packSelected : ''} ${p.popular ? styles.packPopular : ''}`}
                onClick={() => setSelected(p.id)}
              >
                {p.popular && <span className={styles.popularBadge}>Most Popular</span>}
                {p.bonus && <span className={styles.bonusBadge}>{p.bonus}</span>}
                <div className={styles.packCredits}>★{p.credits}</div>
                <div className={styles.packLabel}>{p.label}</div>
                <div className={styles.packPrice}>${p.price}</div>
                <div className={styles.packPer}>${p.perCredit} / credit</div>
              </button>
            ))}
          </div>

          {/* Buy Button */}
          <div className={styles.buyWrap}>
            <div className={styles.buyDetail}>
              <span className={styles.buyCredits}>★{selectedPack.credits}{selectedPack.bonus ? ` ${selectedPack.bonus}` : ''}</span>
              <span className={styles.buyArrow}>→</span>
              <span className={styles.buyPrice}>${selectedPack.price}</span>
            </div>
            <button
              className={styles.buyBtn}
              onClick={() => router.push(`/checkout?plan=credits&pack=${selected}`)}
            >
              Buy ★{selectedPack.credits} Credits — ${selectedPack.price}
            </button>
            <p className={styles.buyNote}>Secure checkout · Credits added instantly · No auto-renewal</p>
          </div>
        </div>

        {/* What you can get */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What you can unlock with credits</h2>
          <div className={styles.itemsGrid}>
            {WHAT_YOU_CAN_BUY.map(item => (
              <div key={item.name} className={styles.item}>
                <span className={styles.itemIcon}>{item.icon}</span>
                <div className={styles.itemInfo}>
                  <span className={styles.itemCat}>{item.cat}</span>
                  <span className={styles.itemName}>{item.name}</span>
                </div>
                <span className={styles.itemCost}>★{item.credits}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership credits */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Or get credits automatically with membership</h2>
          <div className={styles.memberGrid}>
            {MEMBERSHIP_CREDITS.map(m => (
              <div key={m.plan} className={`${styles.memberCard} ${styles[`member_${m.color}`]}`}>
                <p className={styles.memberPlan}>{m.plan}</p>
                <p className={styles.memberCredits}>
                  {m.credits === 0 ? 'No credits' : `★${m.credits} / month`}
                </p>
                <p className={styles.memberDesc}>
                  {m.credits === 0
                    ? 'Free readings only'
                    : m.credits === 30
                    ? 'Enough for ~3 love readings / month'
                    : 'Enough for ~5–8 readings / month'}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.memberCta}>
            <Link href="/checkout?plan=premium" className={styles.btnGhost}>View Premium Plans →</Link>
          </div>
        </div>

        {/* FAQ */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Credits FAQ</h2>
          <div className={styles.faqList}>
            {[
              { q: 'Do credits expire?', a: 'Credits purchased individually do not expire for 12 months from the date of purchase. Credits earned through a monthly membership are valid for that month only.' },
              { q: 'Can I get a refund on credits?', a: 'Unused credit packs may be refunded within 7 days of purchase if no credits have been spent. Once any credit has been used, the pack is non-refundable.' },
              { q: 'Can I use credits for any reading?', a: 'Yes — credits can be used for any premium reading across all categories: Love, Tarot, Fortune, Reports, and Special services.' },
              { q: 'What happens to my credits if I cancel my membership?', a: 'Credits you purchased separately remain in your account. Only the monthly credit allowance from your membership stops when you cancel.' },
              { q: 'Is there a limit to how many credits I can buy?', a: 'No limit. You can purchase multiple packs at any time.' },
            ].map(f => (
              <div key={f.q} className={styles.faqItem}>
                <p className={styles.faqQ}>Q. {f.q}</p>
                <p className={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

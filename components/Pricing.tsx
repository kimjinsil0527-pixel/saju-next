'use client'
import { useRouter } from 'next/navigation'
import ScrollReveal from './ScrollReveal'
import styles from './Pricing.module.css'

export default function Pricing() {
  const router = useRouter()
  return (
    <section className={styles.section} id="pricing">
      <div className="section-wrap">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-eyebrow">Plans</p>
            <div className="ornament-divider"><span className="ornament-symbol">✦</span></div>
            <h2 className="section-title">Choose the depth that fits <span className="gold">you</span></h2>
            <p className="section-desc">Start free. Unlock deeper insight whenever you're ready.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.grid}>
            {/* FREE */}
            <div className={styles.card}>
              <div className={styles.tier}>FREE</div>
              <div className={styles.name}>Free</div>
              <div className={styles.tagline}>No account required<br />Core features, always free</div>
              <div className={styles.price}>
                <div className={styles.priceFree}>$0</div>
                <div className={styles.period}>Forever free</div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.features}>
                <li><span>✓</span> Daily fortune reading</li>
                <li><span>✓</span> Full Four Pillars chart</li>
                <li><span>✓</span> Calendar · Dream · Horoscope</li>
                <li><span>✓</span> Free single tarot card</li>
                <li><span>✓</span> Basic compatibility score</li>
                <li className={styles.disabled}><span>✗</span> Annual detailed report</li>
                <li className={styles.disabled}><span>✗</span> Wealth & career deep analysis</li>
                <li className={styles.disabled}><span>✗</span> Expert 1:1 consultation</li>
              </ul>
              <button className={`${styles.btn} ${styles.btnJade}`} onClick={() => { const el = document.querySelector('section'); el?.scrollIntoView({ behavior: 'smooth' }) }}>Start Free</button>
            </div>

            {/* PREMIUM (featured) */}
            <div className={`${styles.card} ${styles.featured}`}>
              <div className={styles.topLine} />
              <div className={styles.tier}>MONTHLY MEMBERSHIP</div>
              <div className={styles.name}>Cookie Plan</div>
              <div className={styles.tagline}>A monthly cookie allowance<br />Spend only on readings you choose</div>
              <div className={styles.price}>
                <div className={styles.priceMain}><span className={styles.won}>$</span>14.99</div>
                <div className={styles.period}>/ month · taxes may apply</div>
                <div className={styles.priceSub}>35 cookies added after each successful payment</div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.features}>
                <li><span>✓</span> Everything in Free</li>
                <li><span className={styles.gold}>★</span> <strong>35 cookies every paid month</strong></li>
                <li><span className={styles.gold}>★</span> Four Pillars deep reading: 15 cookies</li>
                <li><span className={styles.gold}>★</span> No second charge for the same unlocked chart</li>
                <li><span className={styles.gold}>★</span> Unused cookies remain in your wallet</li>
                <li><span className={styles.gold}>★</span> Cancel the subscription at any time</li>
                <li className={styles.disabled}><span>·</span> More cookie readings will be added as they are completed</li>
              </ul>
              <button className={`${styles.btn} ${styles.btnFeatured}`} onClick={() => router.push('/checkout?plan=premium')}>Get 35 Cookies Monthly</button>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

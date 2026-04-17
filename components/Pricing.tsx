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
              <div className={styles.tier}>PREMIUM</div>
              <div className={styles.name}>Premium</div>
              <div className={styles.tagline}>Annual report + deep analysis<br />Most popular plan</div>
              <div className={styles.price}>
                <div className={styles.priceMain}><span className={styles.won}>$</span>12.99</div>
                <div className={styles.period}>/ mo · $8.99/mo billed annually</div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.features}>
                <li><span>✓</span> Everything in Free</li>
                <li><span className={styles.gold}>★</span> <strong>Full annual reading report (PDF)</strong></li>
                <li><span className={styles.gold}>★</span> Wealth, career & love deep analysis</li>
                <li><span className={styles.gold}>★</span> 10-year major cycle roadmap</li>
                <li><span className={styles.gold}>★</span> In-depth compatibility report</li>
                <li><span className={styles.gold}>★</span> 10-card tarot spread</li>
                <li><span className={styles.gold}>★</span> Monthly fortune calendar</li>
                <li className={styles.disabled}><span>✗</span> Expert 1:1 consult (add-on)</li>
              </ul>
              <button className={`${styles.btn} ${styles.btnFeatured}`} onClick={() => router.push('/checkout?plan=premium')}>Get Premium</button>
            </div>

            {/* VIP */}
            <div className={styles.card}>
              <div className={styles.tier}>VIP</div>
              <div className={styles.name}>VIP Consult</div>
              <div className={styles.tagline}>Live session with a verified master<br />Deeply personalized reading</div>
              <div className={styles.price}>
                <div className={styles.priceMain}><span className={styles.won}>$</span>79.99</div>
                <div className={styles.period}>~ per session · 30 min minimum</div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.features}>
                <li><span>✓</span> Everything in Premium</li>
                <li><span className={styles.ember}>◆</span> Certified Four Pillars master</li>
                <li><span className={styles.ember}>◆</span> Chat / phone / video — your choice</li>
                <li><span className={styles.ember}>◆</span> Session recording provided</li>
                <li><span className={styles.ember}>◆</span> Custom name analysis service</li>
                <li><span className={styles.ember}>◆</span> Auspicious date selection</li>
                <li><span className={styles.ember}>◆</span> Family compatibility package</li>
                <li><span className={styles.ember}>◆</span> Unlimited follow-up for one year</li>
              </ul>
              <button className={`${styles.btn} ${styles.btnEmber}`} onClick={() => router.push('/counseling')}>Book a Consultant</button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

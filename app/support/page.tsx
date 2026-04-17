'use client'
import Link from 'next/link'
import styles from './support.module.css'

const faqs = [
  { q: 'How accurate is the Four Pillars reading?', a: 'Our analysis is based on classical Bazi/Saju methodology with thousands of years of refinement. Accuracy depends on the precision of your birth data, especially birth time. For the most precise reading, knowing your exact birth hour is recommended.' },
  { q: 'Is my birth data kept private?', a: 'Yes. Your birth data is used solely to generate your personal reading and is never sold or shared with third parties. See our Privacy Policy for details.' },
  { q: 'How do I get a refund?', a: 'We offer a 7-day satisfaction guarantee on all premium purchases. Contact us at the email below within 7 days of purchase and we\'ll process a full refund.' },
  { q: 'What\'s the difference between Free and Premium?', a: 'The free reading gives you your full Four Pillars chart and today\'s energy reading. Premium unlocks your annual detailed report (PDF), wealth/career/love deep analysis, 10-year cycle roadmap, and more.' },
  { q: 'Can I cancel my subscription?', a: 'Yes, anytime. Go to your Dashboard → Subscription settings, or contact us and we\'ll cancel immediately with no questions asked.' },
  { q: 'How does the VIP consultation work?', a: 'Browse our verified consultants, select a session format (chat/phone/video), and book a time. You\'ll receive a session recording afterward. Sessions start from 30 minutes.' },
]

export default function Support() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Help Center</p>
        <div className={styles.ornament}><span>✦</span></div>
        <h1 className={styles.title}>How can we <span className={styles.gold}>help you?</span></h1>

        <div className={styles.contactBar}>
          <div className={styles.contactItem}>
            <span>✉</span>
            <div>
              <div className={styles.contactLabel}>Email Support</div>
              <div className={styles.contactValue}>support@mingyun.app</div>
            </div>
          </div>
          <div className={styles.contactItem}>
            <span>⏱</span>
            <div>
              <div className={styles.contactLabel}>Response Time</div>
              <div className={styles.contactValue}>Within 24 hours</div>
            </div>
          </div>
          <div className={styles.contactItem}>
            <span>☽</span>
            <div>
              <div className={styles.contactLabel}>Hours</div>
              <div className={styles.contactValue}>Mon–Fri, 9am–6pm EST</div>
            </div>
          </div>
        </div>

        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqs}>
          {faqs.map((f) => (
            <div key={f.q} className={styles.faq}>
              <div className={styles.faqQ}>{f.q}</div>
              <div className={styles.faqA}>{f.a}</div>
            </div>
          ))}
        </div>

        <div className={styles.contactForm}>
          <h2 className={styles.faqTitle}>Send us a message</h2>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label>Your name</label>
                <input type="text" placeholder="Jane Doe" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Subject</label>
              <input type="text" placeholder="How can we help?" />
            </div>
            <div className={styles.field}>
              <label>Message</label>
              <textarea rows={5} placeholder="Describe your question or issue..." />
            </div>
            <button type="submit" className={styles.submit}>Send Message →</button>
          </form>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import styles from '../info.module.css'

export default function Terms() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>UNMYUNG</Link>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.updated}>Last updated: June 12, 2026</p>

        <div className={styles.body}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using UNMYUNG ("the Service"), you agree to be bound by these Terms of Use and our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use our services. You must be at least 13 years of age to use this Service. By using UNMYUNG, you represent that you meet this age requirement.</p>

          <h2>2. Nature of Service</h2>
          <p>UNMYUNG provides Four Pillars of Destiny (Saju/Bazi) analysis for <strong>entertainment and personal reflection purposes only</strong>. Our readings are based on traditional East Asian cosmological frameworks and do not constitute professional advice in legal, financial, medical, psychological, or any other regulated field. You agree to use readings at your own discretion and risk.</p>

          <h2>3. Free and Paid Services</h2>
          <p>Core readings are available free of charge. The monthly Cookie Membership is a recurring subscription that grants 35 Cookies after each successful payment. One-time Cookie Packs add the displayed number of Cookies without starting a subscription. Paid readings display their Cookie price before confirmation and are unlocked only when the account holder chooses to spend Cookies.</p>

          <h2>4. Cookies</h2>
          <p>Cookies are virtual tokens used only within UNMYUNG.</p>
          <ul>
            <li>Unused Cookies remain in your account unless a refund, chargeback, fraud correction, or legally required adjustment applies.</li>
            <li>Cookies have no cash value and cannot be transferred between accounts.</li>
            <li>Reopening the same previously unlocked reading does not require another Cookie charge.</li>
            <li>Refund eligibility is governed by our <Link href="/refund">Refund Policy</Link> and applicable consumer law.</li>
          </ul>

          <h2>5. Payments & Billing</h2>
          <p>Payments are processed by <strong>Lemon Squeezy</strong>, our Merchant of Record. Lemon Squeezy handles payment details, applicable taxes, receipts, and payment disputes. By starting a recurring plan, you authorize monthly charges until cancellation.</p>

          <h2>6. Refunds & Cancellations</h2>
          <p>Refunds and cancellation terms are set out in our <Link href="/refund">Refund Policy</Link>. The monthly membership may be cancelled at any time, with cancellation taking effect according to the billing terms shown by Lemon Squeezy.</p>

          <h2>7. Data Retention & Account Deletion</h2>
          <p>User data is retained for a maximum of 90 days from the date of last account activity or cancellation. After this period, all personal data is permanently deleted. Accounts inactive for 90 days will be automatically closed and deleted. In the event of service discontinuation, all user data will be deleted within 90 days of the closure date, with at least 30 days advance notice to registered users. Financial transaction records may be retained for up to 5 years as required by applicable tax and accounting law, but will be anonymized after the 90-day period.</p>

          <h2>8. Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:support@unmyung.app">support@unmyung.app</a> if you suspect unauthorized access.</p>

          <h2>9. Intellectual Property</h2>
          <p>All content on UNMYUNG — including analysis text, reports, design elements, and software — is the intellectual property of UNMYUNG and protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

          <h2>10. Limitation of Liability</h2>
          <p>UNMYUNG is not liable for any decisions made based on our readings. The Service is provided "as is" without warranty of any kind. To the maximum extent permitted by applicable law, UNMYUNG's total liability to any user shall not exceed the total amount paid by that user in the 3 months preceding the claim. Nothing in these Terms limits liability for death, personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>

          <h2>11. Prohibited Use</h2>
          <p>You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to reverse-engineer, scrape, or copy our proprietary analysis systems; (c) resell or commercially exploit readings without written permission; (d) impersonate another person or entity.</p>

          <h2>12. Dispute Resolution</h2>
          <p>We encourage you to contact us first at <a href="mailto:support@unmyung.app">support@unmyung.app</a> to resolve any dispute. If we cannot resolve a dispute informally, it shall be submitted to binding arbitration under the rules of a mutually agreed arbitration body, except where prohibited by local law. EU and UK consumers retain the right to bring claims before their national courts and may use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>

          <h2>13. Governing Law</h2>
          <p>These Terms are governed by and construed in accordance with applicable law. For EU residents, mandatory consumer protection provisions of your country of residence apply regardless of any governing law clause. For UK residents, English law applies where not superseded by mandatory UK consumer law.</p>

          <h2>14. Changes to Terms</h2>
          <p>We may update these Terms from time to time. For material changes, registered users will be notified by email at least 14 days before the changes take effect. Continued use of the Service after the effective date constitutes acceptance. If you do not agree to the updated Terms, you must discontinue use of the Service.</p>

          <h2>15. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@unmyung.app">support@unmyung.app</a> or visit our <Link href="/support">Support</Link> page.</p>
        </div>
      </div>
    </div>
  )
}

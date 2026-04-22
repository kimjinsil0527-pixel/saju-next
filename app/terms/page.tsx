import Link from 'next/link'
import styles from '../info.module.css'

export default function Terms() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.updated}>Last updated: April 22, 2026</p>

        <div className={styles.body}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using MINGYUN ("the Service"), you agree to be bound by these Terms of Use and our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use our services. You must be at least 13 years of age to use this Service. By using MINGYUN, you represent that you meet this age requirement.</p>

          <h2>2. Nature of Service</h2>
          <p>MINGYUN provides Four Pillars of Destiny (Saju/Bazi) analysis for <strong>entertainment and personal reflection purposes only</strong>. Our readings are based on traditional East Asian cosmological frameworks and do not constitute professional advice in legal, financial, medical, psychological, or any other regulated field. You agree to use readings at your own discretion and risk.</p>

          <h2>3. Free and Premium Services</h2>
          <p>Core readings are provided free of charge without account registration. Premium features require a paid subscription or Star Credit (★) purchase. Subscription plans are billed on a recurring basis (monthly or annually) as selected at checkout. You will be notified of any price changes at least 14 days in advance. Annual subscriptions will generate a renewal reminder at least 7 days before the billing date.</p>

          <h2>4. Star Credits (★)</h2>
          <p>Star Credits are prepaid virtual tokens purchased with real currency for use within the MINGYUN platform.</p>
          <ul>
            <li>Credits <strong>do not expire</strong> and remain valid for the lifetime of your account.</li>
            <li>Credits have no cash value and cannot be transferred between accounts.</li>
            <li>Refund eligibility for credits is governed by our <Link href="/refund">Refund Policy</Link>.</li>
            <li>In the event of service closure, unused credits will be refunded on a pro-rata basis where required by applicable consumer protection law.</li>
          </ul>

          <h2>5. Payments & Billing</h2>
          <p>All payments are processed by <strong>Paddle.com Market Limited</strong>, our authorized Merchant of Record. Paddle handles billing, VAT collection, and payment disputes on our behalf. By purchasing any paid feature, you agree to Paddle's terms of service in addition to these Terms. You authorize recurring charges if you subscribe to a plan with auto-renewal.</p>

          <h2>6. Refunds & Cancellations</h2>
          <p>Refunds and cancellation terms are set out in our <Link href="/refund">Refund Policy</Link>, which forms part of these Terms. In summary: Premium subscriptions may be cancelled at any time; unused credits are refundable within 30 days; VIP sessions are refundable with 48+ hours notice. The Refund Policy takes precedence over any conflicting language elsewhere in these Terms.</p>

          <h2>7. Data Retention & Account Deletion</h2>
          <p>User data is retained for a maximum of 90 days from the date of last account activity or cancellation. After this period, all personal data is permanently deleted. Accounts inactive for 90 days will be automatically closed and deleted. In the event of service discontinuation, all user data will be deleted within 90 days of the closure date, with at least 30 days advance notice to registered users. Financial transaction records may be retained for up to 5 years as required by applicable tax and accounting law, but will be anonymized after the 90-day period.</p>

          <h2>8. Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:support@mingyun.app">support@mingyun.app</a> if you suspect unauthorized access.</p>

          <h2>9. Intellectual Property</h2>
          <p>All content on MINGYUN — including analysis text, reports, design elements, and software — is the intellectual property of MINGYUN and protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

          <h2>10. Limitation of Liability</h2>
          <p>MINGYUN is not liable for any decisions made based on our readings. The Service is provided "as is" without warranty of any kind. To the maximum extent permitted by applicable law, MINGYUN's total liability to any user shall not exceed the total amount paid by that user in the 3 months preceding the claim. Nothing in these Terms limits liability for death, personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>

          <h2>11. Prohibited Use</h2>
          <p>You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to reverse-engineer, scrape, or copy our proprietary analysis systems; (c) resell or commercially exploit readings without written permission; (d) impersonate another person or entity.</p>

          <h2>12. Dispute Resolution</h2>
          <p>We encourage you to contact us first at <a href="mailto:support@mingyun.app">support@mingyun.app</a> to resolve any dispute. If we cannot resolve a dispute informally, it shall be submitted to binding arbitration under the rules of a mutually agreed arbitration body, except where prohibited by local law. EU and UK consumers retain the right to bring claims before their national courts and may use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>

          <h2>13. Governing Law</h2>
          <p>These Terms are governed by and construed in accordance with applicable law. For EU residents, mandatory consumer protection provisions of your country of residence apply regardless of any governing law clause. For UK residents, English law applies where not superseded by mandatory UK consumer law.</p>

          <h2>14. Changes to Terms</h2>
          <p>We may update these Terms from time to time. For material changes, registered users will be notified by email at least 14 days before the changes take effect. Continued use of the Service after the effective date constitutes acceptance. If you do not agree to the updated Terms, you must discontinue use of the Service.</p>

          <h2>15. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@mingyun.app">support@mingyun.app</a> or visit our <Link href="/support">Support</Link> page.</p>
        </div>
      </div>
    </div>
  )
}

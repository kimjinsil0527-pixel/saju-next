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
        <p className={styles.updated}>Last updated: April 12, 2026</p>

        <div className={styles.body}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using MINGYUN, you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.</p>

          <h2>2. Nature of Service</h2>
          <p>MINGYUN provides Four Pillars of Destiny (Saju/Bazi) analysis for entertainment and personal reflection purposes only. Our readings are based on traditional East Asian cosmological frameworks and should not be used as a substitute for professional advice in legal, financial, medical, or psychological matters.</p>

          <h2>3. Free and Premium Services</h2>
          <p>Core readings are provided free of charge without account registration. Premium features require a paid subscription or Star Credit (★) purchase. Premium subscriptions are billed monthly or annually as selected at checkout.</p>

          <h2>4. Star Credits (★)</h2>
          <p>Star Credits are virtual tokens purchased with real currency for use within the MINGYUN platform. Credits are non-refundable once purchased, except as required by applicable law. Unused credits expire 12 months after purchase. Credits have no cash value and cannot be transferred between accounts.</p>

          <h2>5. Data Retention & Service Closure</h2>
          <p><strong>All user data is retained for a maximum of 3 months (90 days) from the date of last account activity or cancellation.</strong> After this period, all personal data is permanently and automatically deleted. In the event of service discontinuation, all user data will be deleted within 90 days of the closure date. Users will be notified at least 30 days in advance of any planned service termination. MINGYUN shall bear no liability for loss of data that has been deleted in accordance with this retention policy.</p>
          <p>Unused Star Credits will be forfeited upon account deletion or service closure. MINGYUN will not be liable for the value of forfeited credits beyond what is required by applicable consumer protection law.</p>

          <h2>6. Refund Policy</h2>
          <p>We offer a 7-day satisfaction guarantee on all premium subscription purchases. If you are not satisfied, contact our support team within 7 days of purchase for a full refund. Star Credit purchases are non-refundable once any credits have been used. Unused credit packs may be refunded within 7 days of purchase if no credits have been spent.</p>

          <h2>7. Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. Accounts inactive for 3 months will be automatically deleted along with all associated data.</p>

          <h2>8. Intellectual Property</h2>
          <p>All content on MINGYUN — including analysis text, reports, design elements, and software — is the intellectual property of MINGYUN and is protected by applicable copyright laws.</p>

          <h2>9. Limitation of Liability</h2>
          <p>MINGYUN is not liable for any decisions made based on our readings. Fortune readings are provided "as is" for informational and reflective purposes only. MINGYUN's total liability to any user shall not exceed the amount paid by that user in the 3 months preceding the claim.</p>

          <h2>10. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. Major changes will be communicated via email to registered users at least 14 days before taking effect.</p>

          <h2>11. Contact</h2>
          <p>For questions about these terms, please visit our <Link href="/support">Support</Link> page.</p>
        </div>
      </div>
    </div>
  )
}

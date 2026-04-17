import Link from 'next/link'
import styles from '../info.module.css'

export default function Privacy() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 12, 2026</p>

        <div className={styles.body}>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide when using our services, including birth date and time entered for readings, email address for account creation, and payment information processed securely through our payment partner. We also collect basic usage data such as pages visited and features used, solely for service improvement purposes.</p>

          <h2>2. How We Use Your Information</h2>
          <p>Your birth data is used exclusively to generate your personalized Four Pillars reading. We do not sell, trade, or transfer your personal information to outside parties without your consent.</p>

          <h2>3. Data Retention Policy</h2>
          <p><strong>All user data — including account information, reading history, birth data, payment records, and session data — is retained for a maximum of 3 months (90 days) from the date of last activity or account cancellation, whichever comes first.</strong></p>
          <p>After 3 months of inactivity, all personal data associated with your account is automatically and permanently deleted from our servers. This applies equally in the event that the MINGYUN service is suspended, discontinued, or terminated for any reason.</p>
          <p>In the event of service closure, all user data will be permanently deleted within 90 days of the closure date. Users will be notified at least 30 days in advance of any planned service termination.</p>
          <p>Payment transaction records required for legal and tax compliance may be retained for up to 5 years as required by applicable law, but will be anonymized after the 3-month period so they cannot be linked back to individual users.</p>
          <p>You may request immediate deletion of all your data at any time by contacting our support team, regardless of the 3-month schedule.</p>

          <h2>4. Cookies</h2>
          <p>We use essential cookies to maintain your session and improve site performance. Session cookies expire automatically after 30 days of inactivity. We do not use tracking cookies for advertising purposes.</p>

          <h2>5. Third-Party Services</h2>
          <p>We use industry-standard payment processors that are PCI-DSS compliant. We never store raw card numbers on our servers. Payment processor records are governed by their own privacy policies and data retention schedules.</p>

          <h2>6. Children's Privacy</h2>
          <p>MINGYUN is not directed at children under 13. We do not knowingly collect personal information from children under 13.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact us through our <Link href="/support">Support</Link> page. All deletion requests are fulfilled within 7 business days.</p>

          <h2>8. Service Discontinuation</h2>
          <p>If MINGYUN ceases operations for any reason, all user data will be permanently and irreversibly deleted within 90 days of the service end date. No user data will be transferred to third parties upon closure. Users will be notified via email (if registered) at least 30 days before any planned discontinuation.</p>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this policy periodically. We will notify registered users of significant changes via email. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
        </div>
      </div>
    </div>
  )
}

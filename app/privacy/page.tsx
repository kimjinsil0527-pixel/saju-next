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
        <p className={styles.updated}>Last updated: April 22, 2026</p>

        <div className={styles.body}>
          <h2>1. Data Controller</h2>
          <p>The data controller responsible for your personal data is <strong>MINGYUN</strong>, reachable at <a href="mailto:support@mingyun.app">support@mingyun.app</a>. Payment processing and related data are handled by Paddle.com Market Limited as our Merchant of Record.</p>

          <h2>2. Information We Collect</h2>
          <p>We collect only what is necessary to provide the Service:</p>
          <ul>
            <li><strong>Reading data:</strong> Birth date, birth time, and gender entered for Four Pillars analysis.</li>
            <li><strong>Account data:</strong> Email address, if you choose to create an account.</li>
            <li><strong>Payment data:</strong> Handled entirely by Paddle. We do not store card numbers or full payment details.</li>
            <li><strong>Usage data:</strong> Pages visited and features used, collected via Vercel Analytics for service improvement. This data is anonymized and aggregated.</li>
            <li><strong>Session data:</strong> A session cookie to maintain your login state.</li>
          </ul>

          <h2>3. Legal Basis for Processing (GDPR)</h2>
          <p>For users in the European Economic Area (EEA), UK, and Switzerland, we process your data under the following legal bases:</p>
          <ul>
            <li><strong>Contract performance (Art. 6(1)(b) GDPR):</strong> Processing your birth data to generate your reading is necessary to fulfil our service to you.</li>
            <li><strong>Legitimate interests (Art. 6(1)(f) GDPR):</strong> Anonymized usage analytics to improve the Service.</li>
            <li><strong>Legal obligation (Art. 6(1)(c) GDPR):</strong> Retaining transaction records for tax and accounting compliance.</li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <p>Your birth data is used <strong>exclusively</strong> to generate your personalized Four Pillars reading. We do not use it for advertising profiling, sell it, or share it with third parties except as described in this policy.</p>

          <h2>5. Third-Party Service Providers</h2>
          <p>We use the following sub-processors who may process your data on our behalf:</p>
          <ul>
            <li><strong>Supabase Inc.</strong> (supabase.com) — Database and authentication hosting. Data may be stored on servers in the United States.</li>
            <li><strong>Vercel Inc.</strong> (vercel.com) — Website hosting and serverless functions. Servers located in the United States and EU regions.</li>
            <li><strong>Paddle.com Market Limited</strong> — Payment processing and Merchant of Record. Governed by Paddle's own privacy policy.</li>
          </ul>
          <p>Each provider maintains appropriate data processing agreements and security certifications. Data transfers to the US are conducted under Standard Contractual Clauses (SCCs) as approved by the European Commission.</p>

          <h2>6. Data Retention</h2>
          <p>All user data is retained for a maximum of <strong>90 days</strong> from the date of last account activity or cancellation, after which it is permanently and automatically deleted. Financial transaction records required for legal and tax compliance may be retained for up to 5 years as required by law, but are anonymized after the 90-day period so they cannot be linked to individual users. You may request immediate deletion at any time.</p>

          <h2>7. Cookies</h2>
          <p>We use only <strong>essential cookies</strong> (session management) and anonymized analytics via Vercel Analytics. We do not use advertising cookies, cross-site tracking, or third-party marketing cookies. Session cookies expire after 30 days of inactivity.</p>

          <h2>8. Children's Privacy</h2>
          <p>MINGYUN is not directed at children under 13 (or under 16 in certain EU jurisdictions). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.</p>

          <h2>9. Your Rights</h2>
          <p>Depending on your jurisdiction, you have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Erasure ("Right to be Forgotten"):</strong> Request deletion of your data.</li>
            <li><strong>Restriction:</strong> Request that we limit processing of your data.</li>
            <li><strong>Portability:</strong> Request your data in a machine-readable format.</li>
            <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
            <li><strong>Withdraw Consent:</strong> Where processing is based on consent, withdraw it at any time.</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:support@mingyun.app">support@mingyun.app</a>. We will respond within <strong>30 days</strong>. Deletion requests are fulfilled within 7 business days.</p>

          <h2>10. Supervisory Authority</h2>
          <p>If you are located in the EEA or UK and believe we have not handled your data in accordance with applicable law, you have the right to lodge a complaint with your national data protection authority. For EU-wide guidance, visit <a href="https://edpb.europa.eu" target="_blank" rel="noopener">edpb.europa.eu</a>. UK residents may contact the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener">ico.org.uk</a>.</p>

          <h2>11. Service Discontinuation</h2>
          <p>If MINGYUN ceases operations, all user data will be permanently deleted within 90 days of the service end date. No user data will be transferred to third parties upon closure. Registered users will be notified by email at least 30 days before any planned discontinuation.</p>

          <h2>12. Changes to This Policy</h2>
          <p>We may update this policy periodically. We will notify registered users of significant changes via email. Continued use of the Service after the effective date constitutes acceptance of the updated policy. Material changes affecting your rights will require explicit re-acknowledgement where required by law.</p>

          <h2>13. Contact</h2>
          <p>For any privacy-related questions or to exercise your rights, contact us at <a href="mailto:support@mingyun.app">support@mingyun.app</a>.</p>
        </div>
      </div>
    </div>
  )
}

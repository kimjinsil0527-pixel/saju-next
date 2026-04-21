export const metadata = {
  title: 'Refund Policy — MINGYUN',
  description: 'Refund and cancellation policy for MINGYUN services.',
}

export default function RefundPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px', color: '#e8d9b5', fontFamily: 'serif', lineHeight: 1.8 }}>
      <p style={{ letterSpacing: '0.15em', fontSize: 13, opacity: 0.6, marginBottom: 16 }}>LEGAL</p>
      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Refund Policy</h1>
      <p style={{ opacity: 0.5, marginBottom: 48 }}>Last updated: April 21, 2026</p>

      <p>This Refund Policy applies to all purchases made through MINGYUN ("we", "our", "the Service"). All transactions are processed by <strong>Paddle.com Market Limited</strong>, our authorized Merchant of Record, which handles billing, VAT, and refund processing on our behalf.</p>

      <h2 style={{ marginTop: 40 }}>1. Free Features</h2>
      <p>The core Four Pillars reading and daily fortune features are provided free of charge. No payment is required, and no refund policy applies.</p>

      <h2 style={{ marginTop: 32 }}>2. Digital Content & Immediate Delivery Waiver</h2>
      <p>Our products (Star Credits, Premium subscriptions, and reading reports) are digital services delivered immediately upon purchase. <strong>By completing your purchase, you expressly acknowledge and agree that:</strong></p>
      <ul style={{ paddingLeft: 24, marginTop: 8 }}>
        <li>The digital content or service begins immediately upon payment confirmation.</li>
        <li>You waive your right of withdrawal under the EU Consumer Rights Directive (Article 16(m)) and equivalent regulations in the UK and other jurisdictions, to the extent permitted by applicable law.</li>
        <li>This waiver does not affect your statutory rights in cases of faulty or misdescribed services.</li>
      </ul>

      <h2 style={{ marginTop: 32 }}>3. Star Credits</h2>
      <p>Star Credits are a prepaid digital currency used within MINGYUN. Once purchased:</p>
      <ul style={{ paddingLeft: 24, marginTop: 8 }}>
        <li>Credits are non-refundable once issued to your account.</li>
        <li>Credits do not expire and remain valid for the lifetime of your account.</li>
        <li>If you have not used any credits, you may request a full refund within <strong>30 days</strong> of purchase by contacting us at <a href="mailto:support@mingyun.app" style={{ color: '#c9a96e' }}>support@mingyun.app</a>.</li>
      </ul>

      <h2 style={{ marginTop: 32 }}>4. Premium Subscription</h2>
      <p>For monthly or annual Premium subscriptions:</p>
      <ul style={{ paddingLeft: 24, marginTop: 8 }}>
        <li>You may cancel at any time through your account settings. Cancellation takes effect at the end of the current billing period.</li>
        <li>If you have not accessed any Premium-only content, you may request a full refund within <strong>14 days</strong> of your initial purchase or renewal.</li>
        <li>Refunds are not issued for partial billing periods after content has been accessed.</li>
        <li>Auto-renewal will be clearly indicated before each charge. You will receive a reminder email at least 7 days before annual renewal.</li>
      </ul>

      <h2 style={{ marginTop: 32 }}>5. VIP Consultation Sessions</h2>
      <ul style={{ paddingLeft: 24, marginTop: 8 }}>
        <li>Cancellations made <strong>48 hours or more</strong> before the scheduled session are eligible for a full refund.</li>
        <li>Cancellations made within 48 hours of the session are not eligible for a refund, but may be rescheduled once at no charge.</li>
        <li>Completed sessions are non-refundable.</li>
      </ul>

      <h2 style={{ marginTop: 32 }}>6. Technical Failures</h2>
      <p>If a verified technical failure on our part prevents you from accessing paid content or completing a session, contact us within <strong>14 days</strong> and we will issue a full refund or credit at our discretion.</p>

      <h2 style={{ marginTop: 32 }}>7. How to Request a Refund</h2>
      <p>Email <a href="mailto:support@mingyun.app" style={{ color: '#c9a96e' }}>support@mingyun.app</a> with:</p>
      <ul style={{ paddingLeft: 24, marginTop: 8 }}>
        <li>Your order ID or email address used at purchase</li>
        <li>The reason for your request</li>
      </ul>
      <p>We will respond within 3 business days. Approved refunds are processed by Paddle and typically appear within 5–10 business days depending on your payment method.</p>

      <h2 style={{ marginTop: 32 }}>8. Chargebacks & Disputes</h2>
      <p>We strongly encourage contacting us before initiating a chargeback. Filing a chargeback for a valid charge may result in account suspension. If you believe a charge is unauthorized, please email us first — we resolve disputes promptly and fairly.</p>

      <h2 style={{ marginTop: 32 }}>9. Merchant of Record</h2>
      <p>All payments are processed by <strong>Paddle.com Market Limited</strong> (registered in England & Wales), acting as the reseller and Merchant of Record. Paddle's own refund terms may also apply. For Paddle-specific inquiries, visit <a href="https://www.paddle.com" target="_blank" rel="noopener" style={{ color: '#c9a96e' }}>paddle.com</a>.</p>

      <h2 style={{ marginTop: 32 }}>10. Changes to This Policy</h2>
      <p>We reserve the right to update this policy at any time. Continued use of the Service after changes constitutes acceptance of the revised policy.</p>

      <p style={{ marginTop: 48, padding: '20px 24px', background: 'rgba(200,169,110,0.07)', borderRadius: 8, fontSize: 14 }}>
        Questions? Contact us at <a href="mailto:support@mingyun.app" style={{ color: '#c9a96e' }}>support@mingyun.app</a>
      </p>
    </main>
  )
}

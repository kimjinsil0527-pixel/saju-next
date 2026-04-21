export const metadata = {
  title: 'Refund Policy — MINGYUN',
  description: 'Refund and cancellation policy for MINGYUN services.',
}

export default function RefundPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px', color: '#e8d9b5', fontFamily: 'serif' }}>
      <p style={{ letterSpacing: '0.15em', fontSize: 13, opacity: 0.6, marginBottom: 16 }}>LEGAL</p>
      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Refund Policy</h1>
      <p style={{ opacity: 0.5, marginBottom: 48 }}>Last updated: April 21, 2026</p>

      <h2>1. Free Features</h2>
      <p>Core features of MINGYUN are free of charge. No payment, no refund applies.</p>

      <h2>2. Star Credits</h2>
      <p>Star Credits are non-refundable once purchased, except where required by law. Credits never expire and can be used across all MINGYUN readings.</p>

      <h2>3. Premium Subscription</h2>
      <p>You may cancel your Premium subscription at any time. Cancellation takes effect at the end of the current billing period. We do not offer prorated refunds for partial months.</p>

      <h2>4. VIP Consultation</h2>
      <p>Consultation sessions are refundable if cancelled at least 24 hours before the scheduled session. No refund is issued for cancellations made within 24 hours or for completed sessions.</p>

      <h2>5. Exceptions</h2>
      <p>If you experience a technical failure that prevents access to a paid feature, please contact us within 7 days at <a href="mailto:support@mingyun.app" style={{ color: '#c9a96e' }}>support@mingyun.app</a> and we will review your case.</p>

      <h2>6. Payment Processor</h2>
      <p>All payments are processed by Paddle.com, our authorized reseller and Merchant of Record. Paddle handles all billing and refund transactions on our behalf.</p>

      <p style={{ marginTop: 48, opacity: 0.5 }}>For any questions, contact us at <a href="mailto:support@mingyun.app" style={{ color: '#c9a96e' }}>support@mingyun.app</a></p>
    </main>
  )
}

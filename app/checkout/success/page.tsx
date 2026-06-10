'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './success.module.css'

function SuccessContent() {
  const params = useSearchParams()
  const provider = params.get('provider')
  const isLemonSqueezy = provider === 'lemonsqueezy' || provider === 'lemon'

  if (!isLemonSqueezy) {
    return (
      <div className={styles.wrap}>
        <div className={styles.iconError}>!</div>
        <h1 className={styles.title}>Payment Status Unavailable</h1>
        <p className={styles.sub}>
          This page cannot confirm a payment. If you were charged, please contact support with the email used at checkout.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>Home</Link>
          <Link href="/#pricing" className={styles.ghost}>View Plans</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>...</div>
      <h1 className={styles.title}>Checkout Received</h1>
      <p className={styles.sub}>
        Lemon Squeezy is securely confirming your payment with our server. Premium access is granted only after that confirmation arrives.
      </p>
      <div className={styles.actions}>
        <Link href="/fortune" className={styles.primary}>Start Reading</Link>
        <Link href="/" className={styles.ghost}>Home</Link>
      </div>
      <div className={styles.note}>
        On the reading page, use the same email entered at checkout to unlock Premium.
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <Suspense fallback={<div className={styles.wrap}><div className={styles.icon}>...</div></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './success.module.css'

function SuccessContent() {
  const params = useSearchParams()
  const provider = params.get('provider')
  const isSupportedProvider =
    provider === 'creem' || provider === 'lemonsqueezy' || provider === 'lemon'

  if (!isSupportedProvider) {
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
        Creem is securely confirming your payment. After the webhook verifies the exact product, its cookies are added to the account linked to your checkout email.
      </p>
      <div className={styles.actions}>
        <Link href="/dashboard" className={styles.primary}>Check Cookie Balance</Link>
        <Link href="/" className={styles.ghost}>Home</Link>
      </div>
      <div className={styles.note}>
        Sign in with the same confirmed email used at checkout. Paid readings spend cookies only when you choose to unlock them.
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

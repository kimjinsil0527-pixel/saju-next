'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './success.module.css'

function SuccessContent() {
  const params = useSearchParams()
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const provider = params.get('provider')

    if (provider === 'lemonsqueezy' || provider === 'lemon') {
      setConfirmed(true)
      return
    }

    const paymentKey = params.get('paymentKey')
    const orderId = params.get('orderId')
    const amount = params.get('amount')

    if (!paymentKey || !orderId || !amount) {
      setError('Missing payment confirmation details. Please contact support if you were charged.')
      return
    }

    fetch('/api/payments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) setConfirmed(true)
        else setError(data.error || 'Payment confirmation failed.')
      })
      .catch(() => setError('Network error while confirming payment.'))
  }, [params])

  if (error) {
    return (
      <div className={styles.wrap}>
        <div className={styles.iconError}>!</div>
        <h1 className={styles.title}>Payment Not Confirmed</h1>
        <p className={styles.sub}>{error}</p>
        <div className={styles.actions}>
          <Link href="/checkout?plan=premium" className={styles.primary}>Try Again</Link>
          <Link href="/" className={styles.ghost}>Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{confirmed ? '*' : '...'}</div>
      <h1 className={styles.title}>
        {confirmed ? 'Payment Confirmed' : 'Confirming Payment'}
      </h1>
      <p className={styles.sub}>
        {confirmed
          ? 'Thank you. Your payment is being processed securely.'
          : 'Please wait while we verify your payment with the provider.'}
      </p>
      {confirmed && (
        <>
          <div className={styles.actions}>
            <Link href="/dashboard" className={styles.primary}>Go to Dashboard</Link>
            <Link href="/" className={styles.ghost}>Home</Link>
          </div>
          <div className={styles.note}>Final access is granted by the server webhook.</div>
        </>
      )}
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

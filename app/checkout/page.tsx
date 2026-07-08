'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  getPaymentProduct,
  type PaymentProductKey,
} from '@/lib/paymentProductCatalog'
import styles from './checkout.module.css'

type AccountStatus =
  | 'loading'
  | 'ready'
  | 'signed-out'
  | 'member'
  | 'unavailable'
  | 'error'

const PRODUCT_COPY: Record<
  PaymentProductKey,
  { title: string; features: string[] }
> = {
  premium: {
    title: 'Monthly Cookie Membership',
    features: [
      '35 cookies added after each successful monthly payment',
      'Four Pillars deep reading costs 15 cookies',
      'No second charge for the same unlocked chart',
      'Unused cookies remain in your wallet',
      'Cancel the subscription at any time',
    ],
  },
  cookies20: {
    title: '20 Cookie Pack',
    features: [
      'One-time cookie top-up',
      'No subscription required',
      'Available to members and free accounts',
      'Unused cookies remain in your wallet',
    ],
  },
  cookies40: {
    title: '40 Cookie Pack',
    features: [
      'One-time cookie top-up',
      'Better value than the 20-cookie pack',
      'Available to members and free accounts',
      'Unused cookies remain in your wallet',
    ],
  },
  cookies80: {
    title: '80 Cookie Pack',
    features: [
      'One-time cookie top-up',
      'Best value one-time cookie pack',
      'Available to members and free accounts',
      'Unused cookies remain in your wallet',
    ],
  },
}

function CheckoutForm() {
  const params = useSearchParams()
  const product = getPaymentProduct(params.get('plan') ?? 'premium')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [accountStatus, setAccountStatus] = useState<AccountStatus>('loading')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!product) return

    fetch(`/api/checkout/account?plan=${encodeURIComponent(product.key)}`, {
      cache: 'no-store',
    })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Account lookup failed.')
        return data
      })
      .then(data => {
        if (!data.signedIn) {
          setAccountStatus('signed-out')
          return
        }
        if (!data.email || !data.accountId || !data.accountSignature) {
          setAccountStatus('error')
          return
        }

        setEmail(data.email)

        if (product.kind === 'subscription' && data.hasMembership) {
          setAccountStatus('member')
          return
        }
        if (!data.productConfigured) {
          setAccountStatus('unavailable')
          return
        }

        setAccountStatus('ready')
      })
      .catch(() => setAccountStatus('error'))
  }, [product])

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.bg} />
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>UNMYUNG</Link>
          <Link href="/#pricing" className={styles.back}>Back to plans</Link>
        </div>
        <div className={styles.layoutSingle}>
          <div className={styles.accountGate}>
            <h1 className={styles.formTitle}>This product is not available</h1>
            <p className={styles.formSub}>Choose a membership or cookie pack from the official page.</p>
            <Link href="/credits" className={styles.submit}>View Cookie Options</Link>
          </div>
        </div>
      </div>
    )
  }

  const copy = PRODUCT_COPY[product.key]
  const backHref = product.kind === 'subscription' ? '/#pricing' : '/credits'
  const nextPath = `/checkout?plan=${product.key}`
  const signInHref = `/signin?next=${encodeURIComponent(nextPath)}`

  async function handlePayment(event: React.FormEvent) {
    event.preventDefault()
    setError('')

    if (!product || !name || !email || accountStatus !== 'ready') {
      setError('Please confirm your account and product, then try again.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: product.key,
          name,
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || 'Could not create checkout.')
      }

      window.location.href = data.checkoutUrl
    } catch {
      setError('Could not open checkout. Please try again in a moment.')
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>UNMYUNG</Link>
        <Link href={backHref} className={styles.back}>View other options</Link>
      </div>

      <div className={styles.layout}>
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <div className={styles.topLine} />
            <p className={styles.summaryPlan}>{copy.title}</p>
            <div className={styles.summaryPrice}>
              <span className={styles.summaryAmount}>{product.displayPrice}</span>
              <span className={styles.summaryBilling}>{product.billing}</span>
            </div>
            <div className={styles.summaryDivider} />
            <ul className={styles.summaryFeatures}>
              {copy.features.map(feature => (
                <li key={feature}><span className={styles.check}>✓</span>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.trust}>
            <div className={styles.trustItem}><span>✓</span> Secure Creem checkout</div>
            <div className={styles.trustItem}><span>✓</span> Cookies are added after webhook verification</div>
            <div className={styles.trustItem}><span>✓</span> Stored safely in your account wallet</div>
          </div>
        </div>

        <div className={styles.formWrap}>
          {accountStatus === 'loading' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>Checking your account</h1>
              <p className={styles.formSub}>We are confirming your sign-in before checkout.</p>
            </div>
          )}

          {accountStatus === 'signed-out' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>Sign in required</h1>
              <p className={styles.formSub}>Sign in first so the purchased cookies can be added to your account.</p>
              <Link href={signInHref} className={styles.submit}>Sign in and continue</Link>
              <Link href="/signup" className={styles.secondaryLink}>Create an account</Link>
            </div>
          )}

          {accountStatus === 'member' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>Membership already active</h1>
              <p className={styles.formSub}>
                You do not need to buy the monthly plan again. You can still buy one-time cookie packs if you need more cookies.
              </p>
              <Link href="/credits" className={styles.submit}>Buy more cookies</Link>
              <Link href="/dashboard" className={styles.secondaryLink}>Go to dashboard</Link>
            </div>
          )}

          {accountStatus === 'unavailable' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>Checkout is being configured</h1>
              <p className={styles.formSub}>
                This product is not connected to Creem yet. Please try again after setup is complete.
              </p>
              <Link href="/credits" className={styles.submit}>View other cookie packs</Link>
            </div>
          )}

          {accountStatus === 'error' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>We could not verify your account</h1>
              <p className={styles.formSub}>Refresh the page or sign in again, then try checkout once more.</p>
              <Link href={signInHref} className={styles.submit}>Sign in again</Link>
            </div>
          )}

          {accountStatus === 'ready' && (
            <>
              <h1 className={styles.formTitle}>Checkout details</h1>
              <p className={styles.formSub}>Enter your name. Creem will open with your signed-in email.</p>
              <form className={styles.form} onSubmit={handlePayment}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Customer</h2>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="checkout-name">Name</label>
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="Your name"
                        required
                        maxLength={100}
                        value={name}
                        onChange={event => setName(event.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="checkout-email">Email</label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={email}
                        readOnly
                      />
                      <span className={styles.accountNote}>
                        This purchase will be linked to your signed-in account.
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Payment</h2>
                  <div className={styles.tossNote}>
                    <div>
                      <div className={styles.tossNoteTitle}>Secure Creem checkout</div>
                      <div className={styles.tossNoteDesc}>
                        Global card payments · tax handled by Merchant of Record · webhook verified
                      </div>
                    </div>
                  </div>
                </div>

                {error && <div className={styles.errorMsg}>{error}</div>}
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={!name || !email || submitting}
                >
                  {submitting ? 'Opening checkout...' : `${product.displayPrice} checkout`}
                </button>
                <p className={styles.disclaimer}>
                  By continuing, you agree to the <Link href="/terms">Terms</Link> and{' '}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  )
}

'use client'

import Link from 'next/link'
import Script from 'next/script'
import { Suspense, useEffect, useRef, useState } from 'react'
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
    title: '쿠키 멤버십 월간',
    features: [
      '결제 성공 시 매월 35쿠키 지급',
      '사주 심층 읽기 1회 15쿠키',
      '같은 사주 결과 재열람은 추가 차감 없음',
      '사용하지 않은 쿠키는 잔액에 유지',
      '언제든지 구독 해지 가능',
    ],
  },
  cookies20: {
    title: '20쿠키 충전',
    features: [
      '한 번만 결제하는 쿠키 팩',
      '월정액 가입 없이 구매 가능',
      '기존 멤버십 회원도 추가 구매 가능',
      '사용하지 않은 쿠키는 잔액에 유지',
    ],
  },
  cookies40: {
    title: '40쿠키 충전',
    features: [
      '한 번만 결제하는 쿠키 팩',
      '월정액 가입 없이 구매 가능',
      '기존 멤버십 회원도 추가 구매 가능',
      '사용하지 않은 쿠키는 잔액에 유지',
    ],
  },
  cookies80: {
    title: '80쿠키 충전',
    features: [
      '한 번만 결제하는 쿠키 팩',
      '월정액 가입 없이 구매 가능',
      '기존 멤버십 회원도 추가 구매 가능',
      '사용하지 않은 쿠키는 잔액에 유지',
    ],
  },
}

function CheckoutForm() {
  const params = useSearchParams()
  const product = getPaymentProduct(params.get('plan') ?? 'premium')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [accountId, setAccountId] = useState('')
  const [accountSignature, setAccountSignature] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [accountStatus, setAccountStatus] = useState<AccountStatus>('loading')
  const checkoutLinkRef = useRef<HTMLAnchorElement>(null)

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
        setAccountId(data.accountId)
        setAccountSignature(data.accountSignature)

        if (product.kind === 'subscription' && data.hasMembership) {
          setAccountStatus('member')
          return
        }
        if (!data.productConfigured || !data.checkoutUrl) {
          setAccountStatus('unavailable')
          return
        }

        setCheckoutUrl(data.checkoutUrl)
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

  function handlePayment(event: React.FormEvent) {
    event.preventDefault()
    if (
      !product ||
      !name ||
      !email ||
      !checkoutUrl ||
      accountStatus !== 'ready' ||
      !accountId ||
      !accountSignature
    ) {
      setError('로그인된 계정과 결제 상품을 확인한 뒤 다시 시도해 주세요.')
      return
    }

    const url = new URL(checkoutUrl)
    url.searchParams.set('checkout[email]', email)
    url.searchParams.set('checkout[name]', name)
    url.searchParams.set('checkout[custom][plan]', product.key)
    url.searchParams.set('checkout[custom][source]', 'saju-next')
    url.searchParams.set('checkout[custom][account_id]', accountId)
    url.searchParams.set('checkout[custom][account_email]', email.trim().toLowerCase())
    url.searchParams.set('checkout[custom][account_signature]', accountSignature)

    if (!checkoutLinkRef.current) return
    checkoutLinkRef.current.href = url.toString()
    checkoutLinkRef.current.click()
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>UNMYUNG</Link>
        <Link href={backHref} className={styles.back}>← 다른 상품 보기</Link>
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
            <div className={styles.trustItem}><span>●</span> Lemon Squeezy 보안 결제</div>
            <div className={styles.trustItem}><span>●</span> 웹훅 확인 후 자동 지급</div>
            <div className={styles.trustItem}><span>●</span> 계정 지갑에 안전하게 보관</div>
          </div>
        </div>

        <div className={styles.formWrap}>
          {accountStatus === 'loading' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>계정 확인 중</h1>
              <p className={styles.formSub}>안전한 결제를 위해 로그인 상태를 확인하고 있습니다.</p>
            </div>
          )}

          {accountStatus === 'signed-out' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>로그인이 필요합니다</h1>
              <p className={styles.formSub}>구매한 쿠키를 계정에 보관하려면 먼저 로그인해 주세요.</p>
              <Link href={signInHref} className={styles.submit}>로그인하고 계속하기</Link>
              <Link href="/signup" className={styles.secondaryLink}>계정 만들기</Link>
            </div>
          )}

          {accountStatus === 'member' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>이미 멤버십이 연결되어 있습니다</h1>
              <p className={styles.formSub}>
                월정액은 다시 결제할 필요가 없습니다. 쿠키가 더 필요하면 일회성 쿠키 팩을 구매할 수 있습니다.
              </p>
              <Link href="/credits" className={styles.submit}>쿠키 추가 구매</Link>
              <Link href="/dashboard" className={styles.secondaryLink}>대시보드로 이동</Link>
            </div>
          )}

          {accountStatus === 'unavailable' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>상품 설정 중입니다</h1>
              <p className={styles.formSub}>
                이 쿠키 팩은 아직 결제 시스템 연결이 완료되지 않았습니다.
              </p>
              <Link href="/credits" className={styles.submit}>다른 쿠키 상품 보기</Link>
            </div>
          )}

          {accountStatus === 'error' && (
            <div className={styles.accountGate}>
              <h1 className={styles.formTitle}>계정을 확인하지 못했습니다</h1>
              <p className={styles.formSub}>페이지를 새로고침하거나 다시 로그인한 뒤 시도해 주세요.</p>
              <Link href={signInHref} className={styles.submit}>다시 로그인하기</Link>
            </div>
          )}

          {accountStatus === 'ready' && (
            <>
              <h1 className={styles.formTitle}>결제 정보 입력</h1>
              <p className={styles.formSub}>이름을 입력하면 로그인한 이메일로 결제창이 열립니다.</p>
              <form className={styles.form} onSubmit={handlePayment}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>고객 정보</h2>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="checkout-name">이름</label>
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="홍길동"
                        required
                        value={name}
                        onChange={event => setName(event.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="checkout-email">이메일</label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={email}
                        readOnly
                      />
                      <span className={styles.accountNote}>
                        결제와 쿠키가 현재 로그인한 계정에 연결됩니다.
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>결제 수단</h2>
                  <div className={styles.tossNote}>
                    <div>
                      <div className={styles.tossNoteTitle}>Lemon Squeezy 안전 결제</div>
                      <div className={styles.tossNoteDesc}>
                        신용카드 · PayPal · 글로벌 결제 지원 · VAT 자동 처리
                      </div>
                    </div>
                  </div>
                </div>

                {error && <div className={styles.errorMsg}>{error}</div>}
                <button type="submit" className={styles.submit} disabled={!name || !email}>
                  {product.displayPrice} 결제하기
                </button>
                <p className={styles.disclaimer}>
                  결제 완료 시 <Link href="/terms">이용약관</Link> 및{' '}
                  <Link href="/privacy">개인정보처리방침</Link>에 동의한 것으로 간주됩니다.
                </p>
              </form>
            </>
          )}

          <a
            ref={checkoutLinkRef}
            href={checkoutUrl || '#'}
            className="lemonsqueezy-button"
            style={{ display: 'none' }}
          >
            checkout
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <>
      <Suspense>
        <CheckoutForm />
      </Suspense>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
    </>
  )
}

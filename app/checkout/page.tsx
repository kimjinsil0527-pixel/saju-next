'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState, useRef } from 'react'
import styles from './checkout.module.css'

const LS_CHECKOUT_URLS: Record<string, string> = {
  premium: 'https://saju-unmyung.lemonsqueezy.com/checkout/buy/2a7e3b8e-66d5-4ba6-8930-edd92a56ddf5',
}

const PLANS: Record<string, { name: string; displayPrice: string; billing: string; annualNote: string; features: string[] }> = {
  premium: {
    name: 'Premium 월간',
    displayPrice: '₩19,900',
    billing: '월 결제',
    annualNote: '연간 결제 시 ₩12,400/월 (₩149,000/년)',
    features: [
      '전체 연간 운세 리포트 (PDF)',
      '재물·직업·애정 심층 분석',
      '10년 대운 로드맵',
      '심층 궁합 리포트',
      '10장 타로 스프레드',
      '월별 운세 캘린더',
      '매월 ★30 크레딧 지급',
    ],
  },
}

function CheckoutForm() {
  const router = useRouter()
  const params = useSearchParams()
  const planKey = params.get('plan') ?? 'premium'
  const isSupportedPlan = planKey === 'premium'
  const plan = PLANS[planKey] ?? PLANS.premium
  const lsUrl = LS_CHECKOUT_URLS[planKey]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const lsLinkRef = useRef<HTMLAnchorElement>(null)

  if (!isSupportedPlan) {
    return (
      <div className={styles.page}>
        <div className={styles.bg} />
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>UNMYUNG</Link>
          <Link href="/#pricing" className={styles.back}>Back to plans</Link>
        </div>
        <div className={styles.layout}>
          <div className={styles.formWrap}>
            <h1 className={styles.formTitle}>This product is not available yet</h1>
            <p className={styles.formSub}>
              Only the Premium test checkout is currently enabled.
            </p>
            <Link href="/checkout?plan=premium" className={styles.submit}>
              View Premium
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Lemon Squeezy 결제 (LS URL이 있는 플랜) ───────────────────────────────
  function handleLSPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !lsUrl) return
    // 이름/이메일 pre-fill 후 overlay 열기
    const checkoutUrl = new URL(lsUrl)
    checkoutUrl.searchParams.set('checkout[email]', email)
    checkoutUrl.searchParams.set('checkout[name]', name)
    checkoutUrl.searchParams.set('checkout[custom][plan]', planKey)
    checkoutUrl.searchParams.set('checkout[custom][source]', 'saju-next')
    lsLinkRef.current!.href = checkoutUrl.toString()
    lsLinkRef.current!.click()
  }

  // LS URL이 있으면 LS 결제 폼 렌더
  if (lsUrl) {
    return (
      <div className={styles.page}>
        <div className={styles.bg} />
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>UNMYUNG</Link>
          <Link href="/#pricing" className={styles.back}>← 플랜 변경</Link>
        </div>
        <div className={styles.layout}>
          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <div className={styles.topLine} />
              <p className={styles.summaryPlan}>{plan.name}</p>
              <div className={styles.summaryPrice}>
                <span className={styles.summaryAmount}>{plan.displayPrice}</span>
                <span className={styles.summaryBilling}>{plan.billing}</span>
              </div>
              {plan.annualNote && <p className={styles.summaryNote}>{plan.annualNote}</p>}
              <div className={styles.summaryDivider} />
              <ul className={styles.summaryFeatures}>
                {plan.features.map((f) => (
                  <li key={f}><span className={styles.check}>✓</span>{f}</li>
                ))}
              </ul>
            </div>
            <div className={styles.trust}>
              <div className={styles.trustItem}><span>🔒</span> 256-bit SSL 보안 결제</div>
              <div className={styles.trustItem}><span>↩</span> 환불 정책 적용</div>
              <div className={styles.trustItem}><span>✦</span> 언제든지 해지 가능</div>
            </div>
          </div>
          <div className={styles.formWrap}>
            <h1 className={styles.formTitle}>결제 정보 입력</h1>
            <p className={styles.formSub}>이름과 이메일을 입력하면 결제창이 열립니다</p>
            <form className={styles.form} onSubmit={handleLSPayment}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>고객 정보</h3>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label>이름</label>
                    <input type="text" placeholder="홍길동" required value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label>이메일</label>
                    <input type="email" placeholder="example@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>결제 수단</h3>
                <div className={styles.tossNote}>
                  <div className={styles.tossNoteIcon}>💳</div>
                  <div>
                    <div className={styles.tossNoteTitle}>Lemon Squeezy 안전 결제</div>
                    <div className={styles.tossNoteDesc}>신용카드 · PayPal · 글로벌 결제 지원 · VAT 자동 처리</div>
                  </div>
                </div>
              </div>
              {error && <div className={styles.errorMsg}>{error}</div>}
              <button type="submit" className={styles.submit} disabled={!name || !email}>
                {plan.displayPrice} 결제하기
              </button>
              <p className={styles.disclaimer}>
                결제 완료 시 <Link href="/terms">이용약관</Link> 및 <Link href="/privacy">개인정보처리방침</Link>에 동의한 것으로 간주됩니다.
              </p>
            </form>
            {/* LS overlay trigger — hidden, clicked programmatically */}
            <a ref={lsLinkRef} href={lsUrl} className="lemonsqueezy-button" style={{ display: 'none' }}>checkout</a>
          </div>
        </div>
      </div>
    )
  }

  // ── Toss 결제 (LS URL 없는 플랜 fallback) ────────────────────────────────
  async function handleTossPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) return
    setLoading(true)
    setError('')

    try {
      const createRes = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey, customerName: name, customerEmail: email }),
      })
      const createData = await createRes.json()
      if (!createData.ok || !createData.orderId) {
        throw new Error('결제 정보 생성 실패')
      }
      const orderId = createData.orderId
      const amount = createData.amount

      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY

      if (!clientKey || clientKey.includes('your-client-key')) {
        alert('결제 키를 설정해주세요.')
        router.push('/checkout/success?orderId=' + orderId)
        return
      }

      // 토스페이먼츠 SDK 동적 로드
      const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk')
      const tossPayments = await loadTossPayments(clientKey)
      const payment = tossPayments.payment({ customerKey: email })

      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: amount },
        orderId,
        orderName: `UNMYUNG ${plan.name}`,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout?plan=${planKey}&error=true`,
        customerEmail: email,
        customerName: name,
      })
    } catch (err) {
      setError('결제 중 오류가 발생했습니다. 다시 시도해주세요.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>UNMYUNG</Link>
        <Link href="/#pricing" className={styles.back}>← 플랜 변경</Link>
      </div>

      <div className={styles.layout}>
        {/* 주문 요약 */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <div className={styles.topLine} />
            <div className={styles.summaryBadge}>{plan.name}</div>
            <div className={styles.summaryPrice}>{plan.displayPrice}</div>
            <div className={styles.summaryBilling}>{plan.billing}</div>
            <div className={styles.summaryNote}>{plan.annualNote}</div>
            <div className={styles.summaryDivider} />
            <ul className={styles.summaryFeatures}>
              {plan.features.map((f) => (
                <li key={f}><span className={styles.check}>✓</span>{f}</li>
              ))}
            </ul>
          </div>

          <div className={styles.trust}>
            <div className={styles.trustItem}><span>🔒</span> 256-bit SSL 보안 결제</div>
            <div className={styles.trustItem}><span>↩</span> 7일 환불 보장</div>
            <div className={styles.trustItem}><span>✦</span> 언제든지 해지 가능</div>
          </div>
        </div>

        {/* 결제 폼 */}
        <div className={styles.formWrap}>
          <h1 className={styles.formTitle}>결제 정보 입력</h1>
          <p className={styles.formSub}>결제 완료 즉시 서비스가 활성화됩니다</p>

          <form className={styles.form} onSubmit={handleTossPayment}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>고객 정보</h3>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>이름</label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>이메일</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>결제 수단</h3>
              <div className={styles.tossNote}>
                <div className={styles.tossNoteIcon}>💳</div>
                <div>
                  <div className={styles.tossNoteTitle}>토스페이먼츠 안전 결제</div>
                  <div className={styles.tossNoteDesc}>신용카드 · 체크카드 · 카카오페이 · 네이버페이 · 토스페이 지원</div>
                </div>
              </div>
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? '결제창 열기...' : `${plan.displayPrice} 결제하기`}
            </button>
            <p className={styles.disclaimer}>
              결제 완료 시 <Link href="/terms">이용약관</Link> 및 <Link href="/privacy">개인정보처리방침</Link>에 동의한 것으로 간주됩니다.
            </p>
          </form>
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

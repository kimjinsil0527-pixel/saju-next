'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import styles from './checkout.module.css'

const PLANS = {
  premium: {
    name: 'Premium',
    price: '10900',
    displayPrice: '₩10,900',
    billing: '월 결제',
    annualNote: '연간 결제 시 ₩7,900/월 (₩94,800/년)',
    features: [
      '전체 연간 운세 리포트 (PDF)',
      '재물·직업·애정 심층 분석',
      '10년 대운 로드맵',
      '심층 궁합 리포트',
      '10장 타로 스프레드',
      '월별 운세 캘린더',
    ],
  },
  vip: {
    name: 'VIP 상담',
    price: '29900',
    displayPrice: '₩29,900',
    billing: '1회 세션',
    annualNote: '세션 종류 및 시간에 따라 가격 상이',
    features: [
      'Premium의 모든 혜택',
      '공인 사주 전문가 1:1 상담',
      '채팅 / 전화 / 화상 중 선택',
      '세션 녹화 제공',
      '작명 서비스',
      '택일 서비스',
    ],
  },
}

function CheckoutForm() {
  const router = useRouter()
  const params = useSearchParams()
  const planKey = (params.get('plan') ?? 'premium') as keyof typeof PLANS
  const plan = PLANS[planKey] ?? PLANS.premium

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleTossPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) return
    setLoading(true)
    setError('')

    try {
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`

      // Supabase에 pending 결제 기록 생성
      await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount: Number(plan.price), plan: planKey, customerName: name, customerEmail: email }),
      })

      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY

      // 토스페이먼츠 클라이언트 키가 없으면 테스트 모드 안내
      if (!clientKey || clientKey.includes('your-client-key')) {
        alert('토스페이먼츠 클라이언트 키를 .env.local에 설정해주세요.\n현재는 테스트 완료 페이지로 이동합니다.')
        router.push('/checkout/success?orderId=' + orderId)
        return
      }

      // 토스페이먼츠 SDK 동적 로드
      const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk')
      const tossPayments = await loadTossPayments(clientKey)
      const payment = tossPayments.payment({ customerKey: email })

      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: Number(plan.price) },
        orderId,
        orderName: `MINGYUN ${plan.name}`,
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
        <Link href="/" className={styles.logo}>MINGYUN</Link>
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

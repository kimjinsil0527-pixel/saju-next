'use client'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './success.module.css'

function SuccessContent() {
  const params = useSearchParams()
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const paymentKey = params.get('paymentKey')
    const orderId = params.get('orderId')
    const amount = params.get('amount')

    // 토스페이먼츠 리다이렉트로 온 경우 서버에서 승인 처리
    if (paymentKey && orderId && amount) {
      fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.ok) setConfirmed(true)
          else setError(data.error || '결제 확인 중 오류 발생')
        })
        .catch(() => setError('네트워크 오류'))
    } else {
      // orderId만 있는 경우 (테스트 모드)
      setConfirmed(true)
    }
  }, [params])

  if (error) {
    return (
      <div className={styles.wrap}>
        <div className={styles.iconError}>✕</div>
        <h1 className={styles.title}>결제 확인 실패</h1>
        <p className={styles.sub}>{error}</p>
        <div className={styles.actions}>
          <Link href="/checkout?plan=premium" className={styles.primary}>다시 시도하기</Link>
          <Link href="/" className={styles.ghost}>홈으로</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{confirmed ? '✦' : '⟳'}</div>
      <h1 className={styles.title}>
        {confirmed ? '결제가 완료되었습니다!' : '결제 확인 중...'}
      </h1>
      <p className={styles.sub}>
        {confirmed
          ? '구매해 주셔서 감사합니다. 프리미엄 리포트가 준비되었습니다.'
          : '잠시만 기다려주세요.'}
      </p>
      {confirmed && (
        <>
          <div className={styles.actions}>
            <Link href="/dashboard" className={styles.primary}>내 대시보드로 →</Link>
            <Link href="/" className={styles.ghost}>홈으로</Link>
          </div>
          <div className={styles.note}>확인 이메일이 발송되었습니다.</div>
        </>
      )}
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <Suspense fallback={<div className={styles.wrap}><div className={styles.icon}>⟳</div></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}

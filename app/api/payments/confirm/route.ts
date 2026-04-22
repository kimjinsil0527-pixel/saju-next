import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount: clientAmount } = await req.json()

    if (!paymentKey || !orderId) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }

    const secretKey = process.env.TOSS_SECRET_KEY
    if (!secretKey || secretKey.includes('your-secret-key')) {
      return NextResponse.json({ error: '결제 설정이 완료되지 않았습니다.' }, { status: 400 })
    }

    // ── Re-verify amount from DB — never trust client ─────────────────────────
    const sb = createServiceClient()
    const { data: dbPayment, error: fetchError } = await sb
      .from('payments')
      .select('amount, status')
      .eq('order_id', orderId)
      .single()

    if (fetchError || !dbPayment) {
      return NextResponse.json({ error: '주문 정보를 찾을 수 없습니다.' }, { status: 404 })
    }

    if (dbPayment.status !== 'pending') {
      return NextResponse.json({ error: '이미 처리된 주문입니다.' }, { status: 400 })
    }

    // Reject if client-sent amount doesn't match DB record
    if (clientAmount !== undefined && Number(clientAmount) !== Number(dbPayment.amount)) {
      console.warn(`[confirm] Amount mismatch: client=${clientAmount}, db=${dbPayment.amount}, orderId=${orderId}`)
      return NextResponse.json({ error: '결제 금액이 일치하지 않습니다.' }, { status: 400 })
    }

    const authorizedAmount = dbPayment.amount  // always use DB amount for Toss call

    // ── Toss Payments 결제 승인 ───────────────────────────────────────────────
    const encoded = Buffer.from(secretKey + ':').toString('base64')
    const tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount: authorizedAmount }),
    })

    const tossData = await tossRes.json()

    if (!tossRes.ok) {
      await sb.from('payments').update({ status: 'failed' }).eq('order_id', orderId)
      return NextResponse.json({ error: '결제 승인에 실패했습니다.' }, { status: 400 })
    }

    await sb.from('payments').update({
      payment_key: paymentKey,
      status: 'done',
    }).eq('order_id', orderId)

    return NextResponse.json({ ok: true, payment: tossData })
  } catch (err) {
    console.error('payment confirm error:', err)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

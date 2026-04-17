import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json()

    const secretKey = process.env.TOSS_SECRET_KEY
    if (!secretKey || secretKey.includes('your-secret-key')) {
      return NextResponse.json({ error: '토스페이먼츠 시크릿 키가 설정되지 않았습니다.' }, { status: 400 })
    }

    // 토스페이먼츠 결제 승인 API 호출
    const encoded = Buffer.from(secretKey + ':').toString('base64')
    const tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })

    const tossData = await tossRes.json()

    if (!tossRes.ok) {
      // 실패 시 DB 업데이트
      const sb = createServiceClient()
      await sb.from('payments').update({ status: 'failed' }).eq('order_id', orderId)
      return NextResponse.json({ error: tossData.message ?? '결제 승인 실패' }, { status: 400 })
    }

    // 성공 시 DB 업데이트
    const sb = createServiceClient()
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

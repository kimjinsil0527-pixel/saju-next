import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { orderId, amount, plan, customerName, customerEmail } = await req.json()

    const sb = createServiceClient()
    const { error } = await sb.from('payments').insert({
      order_id: orderId,
      amount,
      plan,
      status: 'pending',
      customer_name: customerName,
      customer_email: customerEmail,
    })

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('payment create error:', err)
    // DB 미연결이어도 결제는 진행 가능하도록 200 반환
    return NextResponse.json({ ok: false })
  }
}

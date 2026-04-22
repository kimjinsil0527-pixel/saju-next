import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

// ── Server-side price table (cents / won) ─────────────────────────────────────
// These are the ONLY valid amounts. Clients cannot override these.
const PLAN_PRICES: Record<string, number> = {
  premium_monthly: 1299,   // $12.99
  premium_annual: 8999,    // $89.99 / year (≈ $8.99/mo × 10)
  vip: 7999,               // $79.99 VIP session
  credits_10: 999,         // 10 star credits
  credits_30: 2499,        // 30 star credits
  credits_100: 6999,       // 100 star credits
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, plan, customerName, customerEmail } = await req.json()

    // Validate required fields
    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json({ error: 'Invalid order ID.' }, { status: 400 })
    }
    if (!plan || typeof plan !== 'string') {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })
    }

    // Server-side amount determination — never trust client-sent amount
    const amount = PLAN_PRICES[plan]
    if (amount === undefined) {
      return NextResponse.json({ error: 'Unknown plan.' }, { status: 400 })
    }

    const sb = createServiceClient()
    const { error } = await sb.from('payments').insert({
      order_id: orderId,
      amount,           // authoritative server-side amount
      plan,
      status: 'pending',
      customer_name: customerName ?? null,
      customer_email: customerEmail ?? null,
    })

    if (error) throw error
    return NextResponse.json({ ok: true, amount })
  } catch (err) {
    console.error('payment create error:', err)
    return NextResponse.json({ ok: false })
  }
}

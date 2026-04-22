import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

import crypto from 'crypto'

// ── Server-side price table (KRW) ────────────────────────────────────────────
// Canonical prices. Client-sent amounts are IGNORED — only plan key matters.
const PLAN_PRICES: Record<string, number> = {
  premium: 10900,    // ₩10,900/월
  vip: 29900,        // ₩29,900/세션
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function generateOrderId(): string {
  const rand = crypto.randomBytes(6).toString('hex').toUpperCase()
  return `ORDER_${Date.now()}_${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const { plan, customerName, customerEmail } = await req.json()

    if (!plan || typeof plan !== 'string') {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })
    }

    // Server-side amount — never trust client-sent amount
    const amount = PLAN_PRICES[plan]
    if (amount === undefined) {
      return NextResponse.json({ error: 'Unknown plan.' }, { status: 400 })
    }

    // Validate email format server-side
    if (customerEmail && !EMAIL_RE.test(String(customerEmail))) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    // Generate orderId server-side (prevents client enumeration)
    const orderId = generateOrderId()

    const sb = createServiceClient()
    const { error } = await sb.from('payments').insert({
      order_id: orderId,
      amount,
      plan,
      status: 'pending',
      customer_name: customerName ? String(customerName).slice(0, 100) : null,
      customer_email: customerEmail ? String(customerEmail).slice(0, 254) : null,
    })

    if (error) throw error
    // Return the server-generated orderId so client can use it for Toss
    return NextResponse.json({ ok: true, orderId, amount })
  } catch (err) {
    console.error('payment create error:', err)
    return NextResponse.json({ ok: false })
  }
}

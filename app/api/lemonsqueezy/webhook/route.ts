import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'

type LemonSqueezyWebhook = {
  meta?: {
    event_name?: string
    custom_data?: Record<string, unknown>
  }
  data?: {
    id?: string
    type?: string
    attributes?: {
      identifier?: string
      user_name?: string
      user_email?: string
      customer_name?: string
      customer_email?: string
      status?: string
      refunded?: boolean
      total?: number
      total_usd?: number
      first_order_item?: {
        product_name?: string
        variant_name?: string
        variant_id?: number | string
        price?: number
      }
    }
  }
}

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!rawBody || !signatureHeader) return false

  const digest = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')

  const expected = Buffer.from(digest, 'hex')
  const actual = Buffer.from(signatureHeader, 'hex')

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function getPlan(payload: LemonSqueezyWebhook): string {
  const customPlan = asString(payload.meta?.custom_data?.plan)
  if (customPlan) return customPlan.slice(0, 80)

  const variantName = payload.data?.attributes?.first_order_item?.variant_name
  const productName = payload.data?.attributes?.first_order_item?.product_name
  return (variantName || productName || 'lemonsqueezy').slice(0, 80)
}

function getPaymentStatus(eventName: string, payload: LemonSqueezyWebhook): string {
  const attrs = payload.data?.attributes
  if (eventName === 'order_refunded' || attrs?.refunded) return 'refunded'
  if (attrs?.status === 'paid') return 'done'
  if (attrs?.status) return attrs.status.slice(0, 40)
  return 'pending'
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 500 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let payload: LemonSqueezyWebhook
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const eventName = req.headers.get('x-event-name') || payload.meta?.event_name || ''
  const orderIdSource = payload.data?.attributes?.identifier || payload.data?.id

  if (!orderIdSource || !eventName.startsWith('order_')) {
    return NextResponse.json({ ok: true, ignored: true })
  }

  const attrs = payload.data?.attributes
  const status = getPaymentStatus(eventName, payload)
  const sb = createServiceClient()

  const { error } = await sb.from('payments').upsert({
    order_id: `ls_${orderIdSource}`,
    payment_key: payload.data?.id ? `lemonsqueezy_order_${payload.data.id}` : `lemonsqueezy_${orderIdSource}`,
    amount: Number(attrs?.total ?? attrs?.total_usd ?? 0),
    plan: getPlan(payload),
    status,
    customer_name: (attrs?.user_name || attrs?.customer_name || null)?.slice(0, 100) ?? null,
    customer_email: (attrs?.user_email || attrs?.customer_email || null)?.slice(0, 254) ?? null,
  }, {
    onConflict: 'order_id',
  })

  if (error) {
    console.error('lemonsqueezy webhook db error:', error)
    return NextResponse.json({ error: 'Failed to store webhook.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

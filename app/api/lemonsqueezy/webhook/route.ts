import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyPaymentAccountSignature } from '@/lib/paymentAccount'
import { grantCookiesForPayment } from '@/lib/cookieWallet'

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
      billing_reason?: string
      subscription_id?: number | string
      product_name?: string
      variant_name?: string
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

  // Premium is currently the only Lemon Squeezy product exposed by this app.
  // Do not use a generic "Default" variant name as the internal entitlement key.
  return 'premium'
}

function getPaymentStatus(eventName: string, payload: LemonSqueezyWebhook): string {
  const attrs = payload.data?.attributes
  if (eventName === 'order_refunded' || attrs?.refunded) return 'refunded'
  if (attrs?.status === 'paid') return 'done'
  if (attrs?.status) return attrs.status.slice(0, 40)
  return 'pending'
}

function getLinkedUserId(payload: LemonSqueezyWebhook, customerEmail: string | null) {
  const userId = asString(payload.meta?.custom_data?.account_id)
  const accountEmail = asString(payload.meta?.custom_data?.account_email)
  const signature = asString(payload.meta?.custom_data?.account_signature)

  if (!userId || !accountEmail || !signature || !customerEmail) return null
  if (accountEmail.toLowerCase() !== customerEmail.toLowerCase()) return null

  return verifyPaymentAccountSignature(userId, accountEmail, signature)
    ? userId
    : null
}

async function resolveLinkedUserId(
  payload: LemonSqueezyWebhook,
  customerEmail: string | null,
) {
  const signedUserId = getLinkedUserId(payload, customerEmail)
  if (signedUserId) return signedUserId
  if (!customerEmail) return null

  const sb = createServiceClient()
  const { data, error } = await sb
    .from('payments')
    .select('user_id')
    .ilike('customer_email', customerEmail)
    .not('user_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data?.user_id ?? null
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

  const isOrderEvent = eventName.startsWith('order_')
  const isPaidRenewal =
    eventName === 'subscription_payment_success' &&
    payload.data?.attributes?.billing_reason === 'renewal'

  if (!orderIdSource || (!isOrderEvent && !isPaidRenewal)) {
    return NextResponse.json({ ok: true, ignored: true })
  }

  const attrs = payload.data?.attributes
  const status = getPaymentStatus(eventName, payload)
  const customerEmail = attrs?.user_email || attrs?.customer_email || null
  const normalizedEmail = customerEmail?.trim().toLowerCase().slice(0, 254) ?? null
  let linkedUserId: string | null
  try {
    linkedUserId = await resolveLinkedUserId(payload, normalizedEmail)
  } catch (error) {
    console.error('lemonsqueezy account link error:', error)
    return NextResponse.json({ error: 'Failed to resolve payment account.' }, { status: 500 })
  }
  const sb = createServiceClient()
  const storedOrderId = isPaidRenewal
    ? `ls_invoice_${orderIdSource}`
    : `ls_${orderIdSource}`
  const paymentKey = isPaidRenewal
    ? `lemonsqueezy_invoice_${payload.data?.id ?? orderIdSource}`
    : payload.data?.id
      ? `lemonsqueezy_order_${payload.data.id}`
      : `lemonsqueezy_${orderIdSource}`

  const paymentRecord: Record<string, string | number | null> = {
    order_id: storedOrderId,
    payment_key: paymentKey,
    amount: Number(attrs?.total ?? attrs?.total_usd ?? 0),
    plan: getPlan(payload),
    status,
    customer_name: (attrs?.user_name || attrs?.customer_name || null)?.slice(0, 100) ?? null,
    customer_email: normalizedEmail,
  }

  if (linkedUserId) paymentRecord.user_id = linkedUserId

  const { data: storedPayment, error } = await sb
    .from('payments')
    .upsert(paymentRecord, { onConflict: 'order_id' })
    .select('id, user_id, order_id')
    .single()

  if (error) {
    console.error('lemonsqueezy webhook db error:', error)
    return NextResponse.json({ error: 'Failed to store webhook.' }, { status: 500 })
  }

  if (status === 'done' && storedPayment.user_id) {
    try {
      await grantCookiesForPayment(
        storedPayment.user_id,
        storedPayment.order_id,
      )
    } catch (grantError) {
      console.error('lemonsqueezy cookie grant error:', grantError)
      return NextResponse.json({ error: 'Failed to grant cookies.' }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}

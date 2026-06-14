import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyPaymentAccountSignature } from '@/lib/paymentAccount'
import { grantCookiesForPayment } from '@/lib/cookieWallet'
import {
  getPaymentProduct,
  type PaymentProduct,
} from '@/lib/paymentProductCatalog'
import { getProductByVariantId } from '@/lib/lemonSqueezyProducts'
import { syncProfileMembership } from '@/lib/subscriptionAccess'

export const runtime = 'nodejs'

type LemonSqueezyWebhook = {
  meta?: {
    event_name?: string
    custom_data?: Record<string, unknown>
    test_mode?: boolean
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
      refunded_amount?: number
      refunded_amount_usd?: number
      total?: number
      total_usd?: number
      billing_reason?: string
      subscription_id?: number | string
      variant_id?: number | string
      cancelled?: boolean
      test_mode?: boolean
      renews_at?: string | null
      ends_at?: string | null
      created_at?: string | null
      updated_at?: string | null
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

const SUBSCRIPTION_EVENTS = new Set([
  'subscription_created',
  'subscription_updated',
  'subscription_cancelled',
  'subscription_resumed',
  'subscription_expired',
  'subscription_paused',
  'subscription_unpaused',
])

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!rawBody || !signatureHeader || !/^[a-f0-9]{64}$/i.test(signatureHeader)) {
    return false
  }

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

function asIsoDate(value: unknown): string | null {
  const text = asString(value)
  if (!text) return null

  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

function resolveDirectProduct(payload: LemonSqueezyWebhook): PaymentProduct | null {
  const attrs = payload.data?.attributes
  return getProductByVariantId(
    attrs?.first_order_item?.variant_id ?? attrs?.variant_id,
  )
}

async function resolvePaymentProduct(
  payload: LemonSqueezyWebhook,
): Promise<PaymentProduct | null> {
  const directProduct = resolveDirectProduct(payload)
  if (directProduct) return directProduct

  const subscriptionId = payload.data?.attributes?.subscription_id
  if (subscriptionId === null || subscriptionId === undefined) return null

  const sb = createServiceClient()
  const { data, error } = await sb
    .from('subscriptions')
    .select('product_key')
    .eq('provider', 'lemonsqueezy')
    .eq('external_id', String(subscriptionId))
    .maybeSingle()

  if (error) throw error
  const storedProduct = getPaymentProduct(data?.product_key)
  if (storedProduct) return storedProduct

  const attrs = payload.data?.attributes
  const customerEmail =
    (attrs?.user_email || attrs?.customer_email || null)
      ?.trim()
      .toLowerCase()
      .slice(0, 254) ?? null
  const metadataProduct = getPaymentProduct(
    asString(payload.meta?.custom_data?.plan),
  )
  const isSignedStorePayment =
    asString(payload.meta?.custom_data?.source) === 'saju-next' &&
    Boolean(getLinkedUserId(payload, customerEmail))

  return isSignedStorePayment && metadataProduct?.kind === 'subscription'
    ? metadataProduct
    : null
}

function getPaymentStatus(eventName: string, payload: LemonSqueezyWebhook): string {
  const attrs = payload.data?.attributes
  const providerStatus = attrs?.status?.trim().toLowerCase()

  if (providerStatus === 'refunded' || attrs?.refunded) return 'refunded'
  if (providerStatus?.includes('refund')) return 'partial_refund'
  if (eventName.endsWith('_refunded')) return 'refunded'
  if (providerStatus === 'paid') return 'done'
  if (providerStatus) return providerStatus.slice(0, 40)
  return 'pending'
}

function getSubscriptionStatus(eventName: string, payload: LemonSqueezyWebhook) {
  const providerStatus = payload.data?.attributes?.status?.trim().toLowerCase()
  if (providerStatus) return providerStatus.slice(0, 40)

  return eventName
    .replace(/^subscription_/, '')
    .replace('resumed', 'active')
    .replace('unpaused', 'active')
    .slice(0, 40)
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

async function handleSubscriptionEvent(
  eventName: string,
  payload: LemonSqueezyWebhook,
) {
  const externalId = asString(payload.data?.id)
  const attrs = payload.data?.attributes
  const product = resolveDirectProduct(payload)

  if (!externalId || !product || product.kind !== 'subscription') {
    const source = asString(payload.meta?.custom_data?.source)
    if (source !== 'saju-next') return { ignored: true }
    throw new Error('Subscription product is not configured or recognized.')
  }

  const variantId = attrs?.variant_id
  if (variantId === null || variantId === undefined) {
    throw new Error('Subscription variant ID is missing.')
  }

  const customerEmail =
    (attrs?.user_email || attrs?.customer_email || null)
      ?.trim()
      .toLowerCase()
      .slice(0, 254) ?? null
  const linkedUserId = await resolveLinkedUserId(payload, customerEmail)

  const sb = createServiceClient()
  const { data, error } = await sb.rpc('upsert_subscription_state', {
    p_external_id: externalId,
    p_user_id: linkedUserId,
    p_customer_email: customerEmail,
    p_product_key: product.key,
    p_variant_id: String(variantId),
    p_status: getSubscriptionStatus(eventName, payload),
    p_cancelled: Boolean(attrs?.cancelled || eventName === 'subscription_cancelled'),
    p_renews_at: asIsoDate(attrs?.renews_at),
    p_ends_at: asIsoDate(attrs?.ends_at),
    p_test_mode: Boolean(attrs?.test_mode ?? payload.meta?.test_mode),
    p_event_name: eventName,
    p_provider_created_at: asIsoDate(attrs?.created_at),
    p_provider_updated_at: asIsoDate(attrs?.updated_at),
  })

  if (error) throw error
  const storedSubscription = Array.isArray(data) ? data[0] : null
  if (storedSubscription?.linked_user_id) {
    await syncProfileMembership(sb, storedSubscription.linked_user_id)
  }

  return { ignored: false }
}

async function recordRefundOutcome(params: {
  eventName: string
  payload: LemonSqueezyWebhook
  payment: { id: string; user_id: string | null; order_id: string }
  product: PaymentProduct
  status: string
}) {
  const { eventName, payload, payment, product, status } = params
  const attrs = payload.data?.attributes
  const isFullRefund = status === 'refunded'
  let autoReversed = false
  let reviewRequired = !isFullRefund || !payment.user_id

  if (isFullRefund && payment.user_id) {
    const sb = createServiceClient()
    const { data, error } = await sb.rpc('reverse_payment_cookies', {
      p_user_id: payment.user_id,
      p_reference: payment.order_id,
      p_reason: eventName,
      p_metadata: {
        event_name: eventName,
        product_key: product.key,
      },
    })

    if (error) throw error
    const reversal = Array.isArray(data) ? data[0] : null
    autoReversed = Boolean(reversal && !reversal.review_required)
    reviewRequired = Boolean(reversal?.review_required)
  }

  const eventId = asString(payload.data?.id) ?? payment.order_id
  const refundedAmount = Number(
    attrs?.refunded_amount ??
    attrs?.refunded_amount_usd ??
    attrs?.total ??
    attrs?.total_usd ??
    0,
  )
  const sb = createServiceClient()
  const { error } = await sb
    .from('payment_refund_reviews')
    .upsert({
      event_key: `${eventName}:${eventId}`,
      payment_id: payment.id,
      user_id: payment.user_id,
      payment_reference: payment.order_id,
      product_key: product.key,
      refunded_amount: Number.isFinite(refundedAmount) ? refundedAmount : 0,
      status: autoReversed && !reviewRequired ? 'auto_reversed' : 'pending_review',
      reason: reviewRequired
        ? 'Refund requires manual review because cookies were used, the refund was partial, or no account was linked.'
        : 'Unused payment cookies were reversed automatically.',
      metadata: {
        event_name: eventName,
        full_refund: isFullRefund,
      },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'event_key' })

  if (error) throw error
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

  if (SUBSCRIPTION_EVENTS.has(eventName)) {
    try {
      const result = await handleSubscriptionEvent(eventName, payload)
      return NextResponse.json({ ok: true, ...result })
    } catch (error) {
      console.error('lemonsqueezy subscription webhook error:', error)
      return NextResponse.json({ error: 'Failed to store subscription state.' }, { status: 500 })
    }
  }

  const orderIdSource = payload.data?.attributes?.identifier || payload.data?.id
  const isOrderEvent = eventName.startsWith('order_')
  const isPaidRenewal =
    eventName === 'subscription_payment_success' &&
    payload.data?.attributes?.billing_reason === 'renewal'
  const isRefundedRenewal =
    eventName === 'subscription_payment_refunded' &&
    payload.data?.attributes?.billing_reason === 'renewal'

  if (!orderIdSource || (!isOrderEvent && !isPaidRenewal && !isRefundedRenewal)) {
    return NextResponse.json({ ok: true, ignored: true })
  }

  let product: PaymentProduct | null
  try {
    product = await resolvePaymentProduct(payload)
  } catch (error) {
    console.error('lemonsqueezy product lookup error:', error)
    return NextResponse.json({ error: 'Failed to verify payment product.' }, { status: 500 })
  }

  const attrs = payload.data?.attributes
  if (!product) {
    const source = asString(payload.meta?.custom_data?.source)
    console.error('lemonsqueezy product verification failed:', {
      eventName,
      variantId: attrs?.first_order_item?.variant_id ?? attrs?.variant_id ?? null,
      subscriptionId: attrs?.subscription_id ?? null,
    })

    if (source !== 'saju-next') {
      return NextResponse.json({ ok: true, ignored: true })
    }

    return NextResponse.json(
      { error: 'Lemon Squeezy product is not configured or recognized.' },
      { status: 500 },
    )
  }

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
  const isSubscriptionInvoice = isPaidRenewal || isRefundedRenewal
  const storedOrderId = isSubscriptionInvoice
    ? `ls_invoice_${orderIdSource}`
    : `ls_${orderIdSource}`
  const paymentKey = isSubscriptionInvoice
    ? `lemonsqueezy_invoice_${payload.data?.id ?? orderIdSource}`
    : payload.data?.id
      ? `lemonsqueezy_order_${payload.data.id}`
      : `lemonsqueezy_${orderIdSource}`

  const paymentRecord: Record<string, string | number | null> = {
    order_id: storedOrderId,
    payment_key: paymentKey,
    amount: Number(attrs?.total ?? attrs?.total_usd ?? 0),
    plan: product.key,
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
        product,
      )
    } catch (grantError) {
      console.error('lemonsqueezy cookie grant error:', grantError)
      return NextResponse.json({ error: 'Failed to grant cookies.' }, { status: 500 })
    }
  }

  if (status === 'refunded' || status === 'partial_refund') {
    try {
      await recordRefundOutcome({
        eventName,
        payload,
        payment: storedPayment,
        product,
        status,
      })
    } catch (refundError) {
      console.error('lemonsqueezy refund handling error:', refundError)
      return NextResponse.json({ error: 'Failed to handle refund.' }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}

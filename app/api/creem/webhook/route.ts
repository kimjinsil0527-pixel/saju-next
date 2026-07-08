import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { verifyPaymentAccountSignature } from '@/lib/paymentAccount'
import { grantCookiesForPayment } from '@/lib/cookieWallet'
import {
  getPaymentProduct,
  type PaymentProduct,
} from '@/lib/paymentProductCatalog'
import { getProductByCreemProductId } from '@/lib/creemProducts'
import { syncProfileMembership } from '@/lib/subscriptionAccess'

export const runtime = 'nodejs'

type JsonRecord = Record<string, unknown>

type CreemWebhook = {
  id?: string
  eventType?: string
  created_at?: string | number
  object?: JsonRecord
}

const SUBSCRIPTION_EVENTS = new Set([
  'subscription.active',
  'subscription.paid',
  'subscription.canceled',
  'subscription.scheduled_cancel',
  'subscription.past_due',
  'subscription.expired',
  'subscription.update',
  'subscription.trialing',
  'subscription.paused',
])

function clean(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as JsonRecord)
    : null
}

function asIsoDate(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date.toISOString()
  }

  const text = clean(value)
  if (!text) return null

  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string) {
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

function objectModeIsTest(...objects: Array<JsonRecord | null>) {
  return objects.some(object => {
    const mode = clean(object?.mode)?.toLowerCase()
    return mode === 'test' || mode === 'sandbox' || mode === 'local'
  })
}

function getMetadata(...objects: Array<JsonRecord | null>) {
  for (const object of objects) {
    const metadata = asRecord(object?.metadata)
    if (metadata) return metadata
  }

  return null
}

function getProductId(...objects: Array<JsonRecord | null>) {
  for (const object of objects) {
    const product = object?.product
    if (typeof product === 'string') return product

    const productRecord = asRecord(product)
    const productId = clean(productRecord?.id)
    if (productId) return productId
  }

  return null
}

function resolveProduct(...objects: Array<JsonRecord | null>): PaymentProduct | null {
  const directProduct = getProductByCreemProductId(getProductId(...objects))
  if (directProduct) return directProduct

  const metadataProduct = getPaymentProduct(clean(getMetadata(...objects)?.plan))
  return metadataProduct
}

function getCustomer(object: JsonRecord | null) {
  return asRecord(object?.customer)
}

function getCustomerEmail(...objects: Array<JsonRecord | null>) {
  for (const object of objects) {
    const customer = getCustomer(object)
    const email = clean(customer?.email)
    if (email) return email.toLowerCase().slice(0, 254)
  }

  return null
}

function getCustomerName(...objects: Array<JsonRecord | null>) {
  for (const object of objects) {
    const customer = getCustomer(object)
    const name = clean(customer?.name)
    if (name) return name.slice(0, 100)
  }

  return null
}

function getLinkedUserIdFromMetadata(metadata: JsonRecord | null, customerEmail: string | null) {
  const userId = clean(metadata?.account_id)
  const accountEmail = clean(metadata?.account_email)
  const signature = clean(metadata?.account_signature)

  if (!userId || !accountEmail || !signature || !customerEmail) return null
  if (accountEmail.toLowerCase() !== customerEmail.toLowerCase()) return null

  return verifyPaymentAccountSignature(userId, accountEmail, signature)
    ? userId
    : null
}

async function resolveLinkedUserId(
  metadata: JsonRecord | null,
  customerEmail: string | null,
) {
  const signedUserId = getLinkedUserIdFromMetadata(metadata, customerEmail)
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

function paymentStatusForOrder(order: JsonRecord | null, checkout: JsonRecord | null) {
  const orderStatus = clean(order?.status)?.toLowerCase()
  const checkoutStatus = clean(checkout?.status)?.toLowerCase()

  if (orderStatus === 'paid' || checkoutStatus === 'completed') return 'done'
  if (orderStatus === 'refunded') return 'refunded'
  if (orderStatus) return orderStatus.slice(0, 40)
  if (checkoutStatus) return checkoutStatus.slice(0, 40)
  return 'pending'
}

function subscriptionStatus(eventName: string, subscription: JsonRecord | null) {
  const providerStatus = clean(subscription?.status)?.toLowerCase()
  if (providerStatus) return providerStatus.slice(0, 40)

  return eventName.replace(/^subscription\./, '').replace('scheduled_cancel', 'canceled')
}

function paymentOrderIdForCheckout(order: JsonRecord | null, checkout: JsonRecord | null) {
  const orderId = clean(order?.id)
  if (orderId) return `creem_${orderId}`

  const checkoutId = clean(checkout?.id)
  return checkoutId ? `creem_${checkoutId}` : null
}

function paymentOrderIdForSubscription(subscription: JsonRecord | null) {
  const transactionId = clean(subscription?.last_transaction_id)
  if (transactionId) return `creem_${transactionId}`

  const subscriptionId = clean(subscription?.id)
  return subscriptionId ? `creem_subscription_${subscriptionId}` : null
}

async function upsertSubscription(params: {
  eventName: string
  subscription: JsonRecord
  product: PaymentProduct
  customerEmail: string | null
  userId: string | null
}) {
  const externalId = clean(params.subscription.id)
  if (!externalId) return null

  const sb = createServiceClient()
  const status = subscriptionStatus(params.eventName, params.subscription)
  const cancelled = Boolean(
    clean(params.subscription.canceled_at) ||
      status === 'canceled' ||
      status === 'cancelled',
  )
  const endsAt =
    asIsoDate(params.subscription.current_period_end_date) ??
    asIsoDate(params.subscription.canceled_at)

  const { data, error } = await sb
    .from('subscriptions')
    .upsert({
      provider: 'creem',
      external_id: externalId,
      user_id: params.userId,
      customer_email: params.customerEmail,
      product_key: params.product.key,
      variant_id: getProductId(params.subscription) ?? params.product.key,
      status,
      cancelled,
      renews_at: asIsoDate(params.subscription.next_transaction_date),
      ends_at: endsAt,
      test_mode: objectModeIsTest(params.subscription),
      last_event_name: params.eventName,
      provider_created_at: asIsoDate(params.subscription.created_at),
      provider_updated_at: asIsoDate(params.subscription.updated_at),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'provider,external_id' })
    .select('user_id')
    .maybeSingle()

  if (error) throw error
  if (data?.user_id) await syncProfileMembership(sb, data.user_id)
  return data
}

async function recordPayment(params: {
  orderId: string
  paymentKey: string
  amount: number
  status: string
  product: PaymentProduct
  customerEmail: string | null
  customerName: string | null
  userId: string | null
}) {
  const sb = createServiceClient()
  const paymentRecord: Record<string, string | number | null> = {
    order_id: params.orderId,
    payment_key: params.paymentKey,
    amount: params.amount,
    plan: params.product.key,
    status: params.status,
    customer_name: params.customerName,
    customer_email: params.customerEmail,
  }

  if (params.userId) paymentRecord.user_id = params.userId

  const { data, error } = await sb
    .from('payments')
    .upsert(paymentRecord, { onConflict: 'order_id' })
    .select('id, user_id, order_id, status')
    .single()

  if (error) throw error
  return data
}

async function handleCheckoutCompleted(payload: CreemWebhook) {
  const checkout = asRecord(payload.object)
  const order = asRecord(checkout?.order)
  const subscription = asRecord(checkout?.subscription)
  const product = resolveProduct(checkout, order, subscription)

  if (!checkout || !order || !product) return { ignored: true }

  const metadata = getMetadata(checkout, subscription)
  const customerEmail = getCustomerEmail(checkout)
  const userId = await resolveLinkedUserId(metadata, customerEmail)

  if (subscription && product.kind === 'subscription') {
    await upsertSubscription({
      eventName: payload.eventType ?? 'checkout.completed',
      subscription,
      product,
      customerEmail,
      userId,
    })
    return { ignored: false }
  }

  if (product.kind !== 'cookie_pack') return { ignored: true }

  const orderId = paymentOrderIdForCheckout(order, checkout)
  if (!orderId) throw new Error('Creem checkout order ID is missing.')

  const storedPayment = await recordPayment({
    orderId,
    paymentKey: `creem_${clean(payload.id) ?? orderId}`,
    amount: Number(order.amount ?? product.priceCents),
    status: paymentStatusForOrder(order, checkout),
    product,
    customerEmail,
    customerName: getCustomerName(checkout),
    userId,
  })

  if (storedPayment.status === 'done' && storedPayment.user_id) {
    await grantCookiesForPayment(storedPayment.user_id, storedPayment.order_id, product)
  }

  return { ignored: false }
}

async function handleSubscriptionEvent(payload: CreemWebhook) {
  const subscription = asRecord(payload.object)
  const product = resolveProduct(subscription)
  if (!subscription || !product || product.kind !== 'subscription') {
    return { ignored: true }
  }

  const metadata = getMetadata(subscription)
  const customerEmail = getCustomerEmail(subscription)
  const userId = await resolveLinkedUserId(metadata, customerEmail)
  await upsertSubscription({
    eventName: payload.eventType ?? 'subscription.update',
    subscription,
    product,
    customerEmail,
    userId,
  })

  if (payload.eventType !== 'subscription.paid') {
    return { ignored: false }
  }

  const orderId = paymentOrderIdForSubscription(subscription)
  if (!orderId) throw new Error('Creem subscription transaction ID is missing.')

  const storedPayment = await recordPayment({
    orderId,
    paymentKey: `creem_${clean(payload.id) ?? orderId}`,
    amount: Number(asRecord(subscription.product)?.price ?? product.priceCents),
    status: 'done',
    product,
    customerEmail,
    customerName: getCustomerName(subscription),
    userId,
  })

  if (storedPayment.user_id) {
    await grantCookiesForPayment(storedPayment.user_id, storedPayment.order_id, product)
  }

  return { ignored: false }
}

async function handleRefund(payload: CreemWebhook) {
  const refund = asRecord(payload.object)
  const transaction = asRecord(refund?.transaction)
  const subscription = asRecord(refund?.subscription)
  const order = asRecord(refund?.order)
  const product = resolveProduct(subscription, order)
  if (!refund || !transaction || !product) return { ignored: true }

  const transactionId = clean(transaction.id)
  const orderRef = clean(transaction.order) ?? clean(order?.id)
  const candidateOrderIds = [
    transactionId ? `creem_${transactionId}` : null,
    orderRef ? `creem_${orderRef}` : null,
  ].filter((value): value is string => Boolean(value))

  if (!candidateOrderIds.length) return { ignored: true }

  const sb = createServiceClient()
  const { data: payment, error: paymentError } = await sb
    .from('payments')
    .select('id, user_id, order_id')
    .in('order_id', candidateOrderIds)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (paymentError) throw paymentError
  if (!payment) return { ignored: true }

  const refundAmount = Number(refund.refund_amount ?? transaction.refunded_amount ?? 0)
  const paidAmount = Number(transaction.amount_paid ?? transaction.amount ?? 0)
  const isFullRefund = paidAmount > 0 && refundAmount >= paidAmount
  let autoReversed = false
  let reviewRequired = !isFullRefund || !payment.user_id

  await sb.from('payments').update({
    status: isFullRefund ? 'refunded' : 'partial_refund',
  }).eq('id', payment.id)

  if (isFullRefund && payment.user_id) {
    const { data, error } = await sb.rpc('reverse_payment_cookies', {
      p_user_id: payment.user_id,
      p_reference: payment.order_id,
      p_reason: payload.eventType ?? 'refund.created',
      p_metadata: {
        event_name: payload.eventType,
        product_key: product.key,
        refund_id: refund.id,
      },
    })

    if (error) throw error
    const reversal = Array.isArray(data) ? data[0] : null
    autoReversed = Boolean(reversal && !reversal.review_required)
    reviewRequired = Boolean(reversal?.review_required)
  }

  const { error } = await sb
    .from('payment_refund_reviews')
    .upsert({
      event_key: `creem:${payload.eventType}:${clean(payload.id) ?? clean(refund.id) ?? payment.order_id}`,
      payment_id: payment.id,
      user_id: payment.user_id,
      payment_reference: payment.order_id,
      product_key: product.key,
      refunded_amount: Number.isFinite(refundAmount) ? refundAmount : 0,
      status: autoReversed && !reviewRequired ? 'auto_reversed' : 'pending_review',
      reason: reviewRequired
        ? 'Refund requires manual review because cookies were used, the refund was partial, or no account was linked.'
        : 'Unused payment cookies were reversed automatically.',
      metadata: {
        provider: 'creem',
        event_name: payload.eventType,
        full_refund: isFullRefund,
      },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'event_key' })

  if (error) throw error
  return { ignored: false }
}

export async function POST(req: NextRequest) {
  const secret = process.env.CREEM_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 500 })
  }

  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (Number.isFinite(contentLength) && contentLength > 262_144) {
    return NextResponse.json({ error: 'Webhook payload is too large.' }, { status: 413 })
  }

  const rawBody = await req.text()
  if (new TextEncoder().encode(rawBody).byteLength > 262_144) {
    return NextResponse.json({ error: 'Webhook payload is too large.' }, { status: 413 })
  }

  if (!verifySignature(rawBody, req.headers.get('creem-signature'), secret)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let payload: CreemWebhook
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  try {
    if (payload.eventType === 'checkout.completed') {
      const result = await handleCheckoutCompleted(payload)
      return NextResponse.json({ ok: true, ...result })
    }

    if (payload.eventType && SUBSCRIPTION_EVENTS.has(payload.eventType)) {
      const result = await handleSubscriptionEvent(payload)
      return NextResponse.json({ ok: true, ...result })
    }

    if (payload.eventType === 'refund.created') {
      const result = await handleRefund(payload)
      return NextResponse.json({ ok: true, ...result })
    }

    return NextResponse.json({ ok: true, ignored: true })
  } catch (error) {
    console.error('creem webhook error:', error)
    return NextResponse.json({ error: 'Failed to process webhook.' }, { status: 500 })
  }
}

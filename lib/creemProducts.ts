import 'server-only'
import {
  PAYMENT_PRODUCTS,
  type PaymentProduct,
  type PaymentProductKey,
} from '@/lib/paymentProductCatalog'

type CreemProductConfig = {
  productId: string | null
}

type CreemCheckoutResponse = {
  checkout_url?: string
  id?: string
  error?: string
  message?: string
}

const DEFAULT_TEST_PRODUCT_IDS = {
  premium: 'prod_1iR4fUUpekZZqoZwkcqXn9',
  cookies20: 'prod_6h7sy1qzQLppQQaVhW8V0t',
  cookies40: 'prod_7hERfSFCZcY3G0see9Ysai',
  cookies80: 'prod_3lzVufPTg3G8puKvpG6j90',
} satisfies Record<PaymentProductKey, string>

function clean(value: string | undefined) {
  return value?.trim() || null
}

function creemEnvironment() {
  const configured = clean(process.env.CREEM_ENVIRONMENT)?.toLowerCase()
  return configured === 'prod' || configured === 'live' || configured === 'production'
    ? 'prod'
    : 'test'
}

export function getCreemApiBaseUrl() {
  const configured = clean(process.env.CREEM_API_BASE_URL)
  if (configured) return configured.replace(/\/+$/, '')

  return creemEnvironment() === 'prod'
    ? 'https://api.creem.io'
    : 'https://test-api.creem.io'
}

export function getCreemSuccessUrl() {
  const siteUrl =
    clean(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://sajuunmyung.com'
  return `${siteUrl.replace(/\/+$/, '')}/checkout/success?provider=creem`
}

function productConfiguration() {
  const useTestDefaults = creemEnvironment() !== 'prod'

  return {
    premium: {
      productId:
        clean(process.env.CREEM_MONTHLY_PRODUCT_ID) ??
        (useTestDefaults ? DEFAULT_TEST_PRODUCT_IDS.premium : null),
    },
    cookies20: {
      productId:
        clean(process.env.CREEM_COOKIE_20_PRODUCT_ID) ??
        (useTestDefaults ? DEFAULT_TEST_PRODUCT_IDS.cookies20 : null),
    },
    cookies40: {
      productId:
        clean(process.env.CREEM_COOKIE_40_PRODUCT_ID) ??
        (useTestDefaults ? DEFAULT_TEST_PRODUCT_IDS.cookies40 : null),
    },
    cookies80: {
      productId:
        clean(process.env.CREEM_COOKIE_80_PRODUCT_ID) ??
        (useTestDefaults ? DEFAULT_TEST_PRODUCT_IDS.cookies80 : null),
    },
  } satisfies Record<PaymentProductKey, CreemProductConfig>
}

export function getCreemProductId(key: PaymentProductKey) {
  return productConfiguration()[key].productId
}

export function getCreemCustomerPortalUrl() {
  return clean(process.env.CREEM_CUSTOMER_PORTAL_URL)
}

export function getProductByCreemProductId(
  productId: string | null | undefined,
): PaymentProduct | null {
  const normalized = clean(productId ?? undefined)
  if (!normalized) return null

  const configuration = productConfiguration()
  const key = (Object.keys(configuration) as PaymentProductKey[]).find(
    productKey => configuration[productKey].productId === normalized,
  )

  return key ? PAYMENT_PRODUCTS[key] : null
}

export function hasConfiguredCreemProduct(key: PaymentProductKey) {
  return Boolean(getCreemProductId(key))
}

export function hasCreemApiKey() {
  return Boolean(clean(process.env.CREEM_API_KEY))
}

export async function createCreemCheckout(params: {
  product: PaymentProduct
  userId: string
  email: string
  name: string
  accountSignature: string
}) {
  const apiKey = clean(process.env.CREEM_API_KEY)
  if (!apiKey) throw new Error('CREEM_API_KEY is not configured.')

  const productId = getCreemProductId(params.product.key)
  if (!productId) throw new Error('Creem product ID is not configured.')

  const normalizedEmail = params.email.trim().toLowerCase()
  const response = await fetch(`${getCreemApiBaseUrl()}/v1/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      product_id: productId,
      request_id: `${params.product.key}:${params.userId}:${Date.now()}`,
      units: 1,
      customer: {
        email: normalizedEmail,
      },
      success_url: getCreemSuccessUrl(),
      metadata: {
        source: 'saju-next',
        provider: 'creem',
        plan: params.product.key,
        account_id: params.userId,
        account_email: normalizedEmail,
        account_signature: params.accountSignature,
        customer_name: params.name.trim().slice(0, 100),
      },
    }),
  })

  const data = (await response.json().catch(() => null)) as
    | CreemCheckoutResponse
    | null

  if (!response.ok || !data || !('checkout_url' in data) || !data.checkout_url) {
    throw new Error(
      data?.message ||
        data?.error ||
        'Failed to create Creem checkout.',
    )
  }

  return {
    checkoutUrl: data.checkout_url,
    checkoutId: data.id ?? null,
  }
}

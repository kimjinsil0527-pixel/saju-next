import 'server-only'
import {
  PAYMENT_PRODUCTS,
  type PaymentProduct,
  type PaymentProductKey,
} from '@/lib/paymentProductCatalog'

const MONTHLY_CHECKOUT_URL =
  'https://saju-unmyung.lemonsqueezy.com/checkout/buy/2a7e3b8e-66d5-4ba6-8930-edd92a56ddf5'

function clean(value: string | undefined) {
  return value?.trim() || null
}

function productConfiguration() {
  const cookiePackCheckoutUrl = clean(
    process.env.LEMONSQUEEZY_COOKIE_PACK_CHECKOUT_URL,
  )

  return {
    premium: {
      checkoutUrl: MONTHLY_CHECKOUT_URL,
      variantId: clean(process.env.LEMONSQUEEZY_MONTHLY_VARIANT_ID),
    },
    cookies20: {
      checkoutUrl: cookiePackCheckoutUrl,
      variantId: clean(process.env.LEMONSQUEEZY_COOKIE_20_VARIANT_ID),
    },
    cookies40: {
      checkoutUrl: cookiePackCheckoutUrl,
      variantId: clean(process.env.LEMONSQUEEZY_COOKIE_40_VARIANT_ID),
    },
    cookies80: {
      checkoutUrl: cookiePackCheckoutUrl,
      variantId: clean(process.env.LEMONSQUEEZY_COOKIE_80_VARIANT_ID),
    },
  } satisfies Record<
    PaymentProductKey,
    { checkoutUrl: string | null; variantId: string | null }
  >
}

export function getLemonCheckoutUrl(key: PaymentProductKey) {
  return productConfiguration()[key].checkoutUrl
}

export function getProductByVariantId(
  variantId: string | number | null | undefined,
): PaymentProduct | null {
  if (variantId === null || variantId === undefined) return null

  const normalized = String(variantId).trim()
  if (!normalized) return null

  const configuration = productConfiguration()
  const key = (Object.keys(configuration) as PaymentProductKey[]).find(
    productKey => configuration[productKey].variantId === normalized,
  )

  return key ? PAYMENT_PRODUCTS[key] : null
}

export function hasConfiguredVariant(key: PaymentProductKey) {
  return Boolean(productConfiguration()[key].variantId)
}

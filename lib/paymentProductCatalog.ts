export const PAYMENT_PRODUCTS = {
  premium: {
    key: 'premium',
    kind: 'subscription',
    name: 'Monthly Cookie Membership',
    shortName: 'Monthly Membership',
    cookies: 35,
    priceCents: 1499,
    displayPrice: '$14.99',
    billing: 'every month',
  },
  cookies20: {
    key: 'cookies20',
    kind: 'cookie_pack',
    name: '20 Cookie Pack',
    shortName: '20 Cookies',
    cookies: 20,
    priceCents: 999,
    displayPrice: '$9.99',
    billing: 'one-time payment',
  },
  cookies40: {
    key: 'cookies40',
    kind: 'cookie_pack',
    name: '40 Cookie Pack',
    shortName: '40 Cookies',
    cookies: 40,
    priceCents: 1999,
    displayPrice: '$19.99',
    billing: 'one-time payment',
  },
  cookies80: {
    key: 'cookies80',
    kind: 'cookie_pack',
    name: '80 Cookie Pack',
    shortName: '80 Cookies',
    cookies: 80,
    priceCents: 3999,
    displayPrice: '$39.99',
    billing: 'one-time payment',
  },
} as const

export type PaymentProductKey = keyof typeof PAYMENT_PRODUCTS
export type PaymentProduct = (typeof PAYMENT_PRODUCTS)[PaymentProductKey]

export const PAYMENT_PRODUCT_KEYS = Object.keys(PAYMENT_PRODUCTS) as PaymentProductKey[]
export const COOKIE_PACK_KEYS = PAYMENT_PRODUCT_KEYS.filter(
  key => PAYMENT_PRODUCTS[key].kind === 'cookie_pack',
)

export function isPaymentProductKey(value: string): value is PaymentProductKey {
  return Object.prototype.hasOwnProperty.call(PAYMENT_PRODUCTS, value)
}

export function getPaymentProduct(value: string | null | undefined): PaymentProduct | null {
  return value && isPaymentProductKey(value) ? PAYMENT_PRODUCTS[value] : null
}

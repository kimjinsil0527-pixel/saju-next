import crypto from 'node:crypto'

const COOKIE_NAME = 'premium_access'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30

type PremiumAccessPayload = {
  email: string
  exp: number
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not configured.')
  return secret
}

function base64Url(input: string): string {
  return Buffer.from(input).toString('base64url')
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function getPremiumAccessCookieName(): string {
  return COOKIE_NAME
}

export function getPremiumAccessMaxAge(): number {
  return MAX_AGE_SECONDS
}

export function normalizePremiumEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function createPremiumAccessToken(email: string): string {
  const payload: PremiumAccessPayload = {
    email: normalizePremiumEmail(email),
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  }
  const encoded = base64Url(JSON.stringify(payload))
  return `${encoded}.${sign(encoded)}`
}

export function verifyPremiumAccessToken(token?: string): PremiumAccessPayload | null {
  if (!token || !token.includes('.')) return null

  const [encoded, signature] = token.split('.', 2)
  const expected = sign(encoded)
  const expectedBuffer = Buffer.from(expected)
  const actualBuffer = Buffer.from(signature)

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as PremiumAccessPayload
    if (!payload.email || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

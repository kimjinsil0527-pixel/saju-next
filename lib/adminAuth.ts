import crypto from 'node:crypto'

export const ADMIN_COOKIE_NAME = 'admin_token'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8

type AdminSessionPayload = {
  version: 1
  issuedAt: number
  expiresAt: number
  nonce: string
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not configured.')
  return secret
}

function sign(encodedPayload: string) {
  return crypto
    .createHmac('sha256', getAuthSecret())
    .update(encodedPayload)
    .digest('base64url')
}

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)
  return (
    valueBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(valueBuffer, expectedBuffer)
  )
}

export function createAdminSession(now = Date.now()) {
  const issuedAt = Math.floor(now / 1000)
  const payload: AdminSessionPayload = {
    version: 1,
    issuedAt,
    expiresAt: issuedAt + ADMIN_SESSION_MAX_AGE,
    nonce: crypto.randomBytes(18).toString('base64url'),
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${encodedPayload}.${sign(encodedPayload)}`
}

export function verifyAdminSession(token: string | null | undefined, now = Date.now()) {
  if (!token) return false

  try {
    const [encodedPayload, signature, extra] = token.split('.')
    if (!encodedPayload || !signature || extra) return false
    if (!safeEqual(signature, sign(encodedPayload))) return false

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as Partial<AdminSessionPayload>
    const currentTime = Math.floor(now / 1000)

    return (
      payload.version === 1 &&
      Number.isInteger(payload.issuedAt) &&
      Number.isInteger(payload.expiresAt) &&
      typeof payload.nonce === 'string' &&
      payload.nonce.length >= 16 &&
      payload.issuedAt! <= currentTime + 60 &&
      payload.expiresAt! > currentTime &&
      payload.expiresAt! - payload.issuedAt! === ADMIN_SESSION_MAX_AGE
    )
  } catch {
    return false
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: '/',
  }
}

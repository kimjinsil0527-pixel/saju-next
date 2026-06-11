import crypto from 'node:crypto'

function getSigningSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not configured.')
  return secret
}

function accountValue(userId: string, email: string) {
  return `${userId}|${email.trim().toLowerCase()}`
}

export function createPaymentAccountSignature(userId: string, email: string) {
  return crypto
    .createHmac('sha256', getSigningSecret())
    .update(accountValue(userId, email))
    .digest('base64url')
}

export function verifyPaymentAccountSignature(
  userId: string,
  email: string,
  signature: string,
) {
  const expected = Buffer.from(createPaymentAccountSignature(userId, email))
  const actual = Buffer.from(signature)

  return (
    expected.length === actual.length &&
    crypto.timingSafeEqual(expected, actual)
  )
}

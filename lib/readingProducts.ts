import crypto from 'node:crypto'

export const FOUR_PILLARS_DEEP_READING = {
  key: 'four-pillars-deep-v1',
  cookieCost: 15,
} as const

export type FourPillarsReadingInput = {
  birthdate: string
  gender: string
  hourKey?: string
  calendar?: string
}

function normalize(value: string | undefined, fallback: string) {
  return value?.trim().toLowerCase() || fallback
}

export function createFourPillarsReadingKey(input: FourPillarsReadingInput) {
  const normalized = [
    FOUR_PILLARS_DEEP_READING.key,
    input.birthdate.trim(),
    normalize(input.gender, 'unknown'),
    normalize(input.hourKey, 'unknown'),
    normalize(input.calendar, 'solar'),
  ].join('|')

  return crypto.createHash('sha256').update(normalized).digest('hex')
}

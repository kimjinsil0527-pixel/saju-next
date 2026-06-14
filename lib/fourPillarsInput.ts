import { Lunar } from 'lunar-javascript'
import { ApiRequestError } from '@/lib/apiSecurity'

const HOUR_KEYS = new Set([
  'rat',
  'ox',
  'tiger',
  'rabbit',
  'dragon',
  'snake',
  'horse',
  'goat',
  'monkey',
  'rooster',
  'dog',
  'pig',
  'unknown',
])

export type ValidatedFourPillarsInput = {
  birthdate: string
  gender: 'male' | 'female'
  hourKey: string
  calendar: 'Solar' | 'Lunar'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function normalizeGender(value: unknown) {
  if (typeof value !== 'string') return null
  const normalized = value.trim().toLowerCase()

  if (['male', 'm', '남성'].includes(normalized)) return 'male' as const
  if (['female', 'f', '여성'].includes(normalized)) return 'female' as const
  return null
}

function normalizeCalendar(value: unknown) {
  if (value === undefined || value === null || value === '') return 'Solar' as const
  if (typeof value !== 'string') return null

  const normalized = value.trim().toLowerCase()
  if (normalized === 'solar' || normalized === '양력') return 'Solar' as const
  if (normalized === 'lunar' || normalized === '음력') return 'Lunar' as const
  return null
}

function isExactSolarDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function isExactLunarDate(year: number, month: number, day: number) {
  try {
    const lunar = Lunar.fromYmd(year, month, day) as Lunar & {
      getYear(): number
      getMonth(): number
      getDay(): number
    }
    return (
      lunar.getYear() === year &&
      lunar.getMonth() === month &&
      lunar.getDay() === day
    )
  } catch {
    return false
  }
}

export function parseFourPillarsInput(body: unknown): ValidatedFourPillarsInput {
  if (!isRecord(body)) {
    throw new ApiRequestError('Invalid reading information.', 400)
  }

  const birthdate = typeof body.birthdate === 'string'
    ? body.birthdate.trim()
    : ''
  const gender = normalizeGender(body.gender)
  const calendar = normalizeCalendar(body.calendar)
  const hourKey = typeof body.hourKey === 'string' && body.hourKey.trim()
    ? body.hourKey.trim().toLowerCase()
    : 'unknown'

  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
    throw new ApiRequestError('Invalid date format. Use YYYY-MM-DD.', 400)
  }
  if (!gender) {
    throw new ApiRequestError('Invalid gender value.', 400)
  }
  if (!calendar) {
    throw new ApiRequestError('Invalid calendar value.', 400)
  }
  if (!HOUR_KEYS.has(hourKey)) {
    throw new ApiRequestError('Invalid birth hour value.', 400)
  }

  const [year, month, day] = birthdate.split('-').map(Number)
  const currentYear = new Date().getFullYear()
  if (year < 1900 || year > currentYear) {
    throw new ApiRequestError(
      'Birth year must be between 1900 and the current year.',
      400,
    )
  }

  const validDate = calendar === 'Lunar'
    ? isExactLunarDate(year, month, day)
    : isExactSolarDate(year, month, day)
  if (!validDate) {
    throw new ApiRequestError('Invalid birth date.', 400)
  }

  return { birthdate, gender, hourKey, calendar }
}

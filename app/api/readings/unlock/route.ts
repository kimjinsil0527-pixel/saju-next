import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import {
  consumeReadingCookies,
  syncCompletedPaymentCookieGrants,
} from '@/lib/cookieWallet'
import {
  createFourPillarsReadingKey,
  FOUR_PILLARS_DEEP_READING,
} from '@/lib/readingProducts'
import {
  apiRequestErrorResponse,
  enforceRateLimit,
  rateLimitResponse,
  readJsonBody,
} from '@/lib/apiSecurity'
import { parseFourPillarsInput } from '@/lib/fourPillarsInput'

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user?.id || !user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Sign in with a confirmed account before using cookies.' },
        { status: 401 },
      )
    }

    const minuteLimit = await enforceRateLimit({
      req,
      scope: 'reading-unlock-minute',
      limit: 8,
      windowSeconds: 60,
      userId: user.id,
    })
    if (!minuteLimit.allowed) return rateLimitResponse(minuteLimit.retryAfter)

    const body = await readJsonBody<unknown>(req, 2048)
    const { birthdate, gender, hourKey, calendar } = parseFourPillarsInput(body)

    const wallet = await syncCompletedPaymentCookieGrants(user)
    const readingKey = createFourPillarsReadingKey({
      birthdate,
      gender,
      hourKey,
      calendar,
    })
    const result = await consumeReadingCookies(
      user.id,
      FOUR_PILLARS_DEEP_READING.key,
      readingKey,
      FOUR_PILLARS_DEEP_READING.cookieCost,
    )

    return NextResponse.json({
      ok: true,
      balance: result?.balance ?? wallet.balance,
      unlocked: result?.unlocked ?? true,
      charged: result?.charged ?? false,
    })
  } catch (error) {
    const requestError = apiRequestErrorResponse(error)
    if (requestError) return requestError

    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('INSUFFICIENT_COOKIES')) {
      return NextResponse.json(
        { error: `You need ${FOUR_PILLARS_DEEP_READING.cookieCost} cookies to unlock this reading.` },
        { status: 402 },
      )
    }

    console.error('reading unlock error:', error)
    return NextResponse.json(
      { error: 'Could not unlock this reading. Please try again.' },
      { status: 500 },
    )
  }
}

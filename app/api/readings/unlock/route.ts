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

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user?.id || !user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Sign in with a confirmed account before using cookies.' },
        { status: 401 },
      )
    }

    const body = await req.json()
    const { birthdate, gender, hourKey, calendar } = body as {
      birthdate?: string
      gender?: string
      hourKey?: string
      calendar?: string
    }

    if (!birthdate || !gender) {
      return NextResponse.json({ error: 'Reading information is missing.' }, { status: 400 })
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
      return NextResponse.json({ error: 'Invalid birth date.' }, { status: 400 })
    }
    if (!['male', 'female', 'M', 'F', 'Male', 'Female'].includes(gender)) {
      return NextResponse.json({ error: 'Invalid gender.' }, { status: 400 })
    }
    if (calendar && !['Solar', 'Lunar', '양력', '음력'].includes(calendar)) {
      return NextResponse.json({ error: 'Invalid calendar.' }, { status: 400 })
    }

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

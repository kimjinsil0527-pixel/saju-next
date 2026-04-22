import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

const ALLOWED_PATH_RE = /^\/[a-zA-Z0-9\-_/]*$/  // only safe URL characters
const MAX_PATH_LEN = 200

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json()

    // Validate path before storing
    if (
      !path ||
      typeof path !== 'string' ||
      path.length > MAX_PATH_LEN ||
      !ALLOWED_PATH_RE.test(path)
    ) {
      return NextResponse.json({ ok: false })
    }

    const referrer = req.headers.get('referer') ?? null
    const userAgent = req.headers.get('user-agent') ?? null

    const sb = createServiceClient()
    await sb.from('page_views').insert({
      path,
      referrer: referrer ? referrer.slice(0, 500) : null,  // cap length
      user_agent: userAgent ? userAgent.slice(0, 300) : null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}

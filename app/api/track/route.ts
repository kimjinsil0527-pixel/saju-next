import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json()
    const referrer = req.headers.get('referer') || null
    const userAgent = req.headers.get('user-agent') || null

    const sb = createServiceClient()
    await sb.from('page_views').insert({ path, referrer, user_agent: userAgent })

    return NextResponse.json({ ok: true })
  } catch {
    // 추적 실패는 조용히 무시
    return NextResponse.json({ ok: false })
  }
}

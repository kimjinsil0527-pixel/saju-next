import type { EmailOtpType } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabaseAuthConfig } from '@/lib/supabase/auth-config'

function safeNextPath(value: string | null) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/dashboard'
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const tokenHash = request.nextUrl.searchParams.get('token_hash')
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null
  const nextPath = safeNextPath(request.nextUrl.searchParams.get('next'))
  const successUrl = new URL(nextPath, request.url)
  let response = NextResponse.redirect(successUrl)

  try {
    const { url, key } = getSupabaseAuthConfig()
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    })

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) return response
    }

    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type,
      })
      if (!error) return response
    }
  } catch {
    // Redirect to a generic error message below.
  }

  response = NextResponse.redirect(new URL('/signin?error=confirmation', request.url))
  return response
}

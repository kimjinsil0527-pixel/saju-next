import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import {
  getSupabaseAuthConfig,
  hasSupabaseAuthCookie,
} from '@/lib/supabase/auth-config'

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false

  let diff = 0
  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }
  return diff === 0
}

function copyCookies(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach(cookie => target.cookies.set(cookie))
  return target
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  try {
    const requestCookies = request.cookies.getAll()
    if (!hasSupabaseAuthCookie(requestCookies)) {
      throw new Error('No auth session cookie.')
    }

    const { url, key } = getSupabaseAuthConfig()
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll: () => requestCookies,
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    })

    await supabase.auth.getClaims()
  } catch {
    // Public pages remain available if Auth is temporarily unavailable.
  }

  if (pathname !== '/admin/login' && pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value
    const validToken = process.env.AUTH_SECRET
    const isValid = Boolean(
      token &&
      validToken &&
      timingSafeEqual(token, validToken),
    )

    if (!isValid) {
      return copyCookies(
        response,
        NextResponse.redirect(new URL('/admin/login', request.url)),
      )
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

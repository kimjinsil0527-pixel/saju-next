import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseAuthConfig, hasSupabaseAuthCookie } from './auth-config'

export async function createAuthClient() {
  const cookieStore = await cookies()
  const { url, key } = getSupabaseAuthConfig()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components cannot write cookies. The proxy refreshes them.
        }
      },
    },
  })
}

export async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies()
    if (!hasSupabaseAuthCookie(cookieStore.getAll())) return null

    const supabase = await createAuthClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    return error ? null : user
  } catch {
    return null
  }
}

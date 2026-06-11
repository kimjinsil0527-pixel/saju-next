export function getSupabaseAuthConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase authentication is not configured.')
  }

  return { url, key }
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sajuunmyung.com').replace(/\/$/, '')
}

export function hasSupabaseAuthCookie(cookies: Array<{ name: string }>) {
  return cookies.some(
    cookie => cookie.name.startsWith('sb-') && cookie.name.includes('-auth-token'),
  )
}

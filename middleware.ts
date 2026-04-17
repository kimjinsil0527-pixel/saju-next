import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/login은 보호 제외
  if (pathname === '/admin/login') return NextResponse.next()

  // /admin 하위 경로 모두 보호
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value
    const validToken = process.env.AUTH_SECRET

    if (!token || token !== validToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

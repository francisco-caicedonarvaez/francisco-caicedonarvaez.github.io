import { NextRequest, NextResponse } from 'next/server'

const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public folder files should never have locale routing
  if (pathname.startsWith('/public') || pathname.startsWith('/static')) {
    return NextResponse.next()
  }

  // Check if pathname starts with a locale
  const pathnameHasLocale = /^\/(en|es)/.test(pathname)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redirect non-locale paths to /en/{path}
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (static assets - no locale routing)
     * - static folder (static assets - no locale routing)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|static|api).*)',
  ],
}

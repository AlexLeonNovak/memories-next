import { i18nMiddleware } from '@/middlewares';
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/constants';

// export default stackMiddlewares([withI18n, withFirebaseAuth]);
export async function middleware(request: NextRequest) {
  // const resp = i18nMiddleware(request);
  console.log('request.nextUrl.pathname', request.nextUrl.pathname);
  if (request.nextUrl.pathname === '/admin') {
    const session = request.cookies.get(SESSION_COOKIE_NAME);
    if (!session) {
      return NextResponse.redirect('/admin/login');
    }
  }
  return i18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/api/login', '/api/logout'],
  // matcher: ['/', '/((?!_next|api|.*\\.).*)', '/(uk|en)/:path*', '/api/login', '/api/logout'],
};

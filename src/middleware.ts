import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { i18nMiddleware } from '@/middlewares';

// export default stackMiddlewares([withI18n, withFirebaseAuth]);
export async function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/api/login', '/api/logout'],
  // matcher: ['/', '/((?!_next|api|.*\\.).*)', '/(uk|en)/:path*', '/api/login', '/api/logout'],
};

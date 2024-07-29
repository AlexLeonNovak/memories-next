import { stackMiddlewares, withFirebaseAuth, withI18n } from '@/middlewares';

export default stackMiddlewares([withI18n, withFirebaseAuth]);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
  // matcher: ['/', '/((?!_next|api|.*\\.).*)', '/(uk|en)/:path*', '/api/login', '/api/logout'],
};

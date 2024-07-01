import {NextRequest, NextResponse} from 'next/server';
import {authMiddleware, redirectToHome, redirectToLogin} from 'next-firebase-auth-edge';
import { firebaseConfig, serverConfig } from "@/lib/firebase.config";
import {redirectToAdmin} from '@/lib/redirects';

const PUBLIC_PATHS = ['/admin/login'];
export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: firebaseConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({token, decodedToken}, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToAdmin(request);
      }

      return NextResponse.next({
        request: {
          headers
        }
      });
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', {reason});

      return redirectToLogin(request, {
        path: '/admin/login',
        publicPaths: PUBLIC_PATHS
      });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', {error});

      return redirectToLogin(request, {
        path: '/admin/login',
        publicPaths: PUBLIC_PATHS
      });
    }
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
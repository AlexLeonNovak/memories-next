import { MiddlewareFactory } from './stackMiddlewares';
import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge';
import { firebaseConfig, serverConfig } from '@/lib/services';

const PUBLIC_PATHS = ['/', '/legal-terms', '/admin/login'];

export const withFirebaseAuth: MiddlewareFactory = (next) => async (request, response) =>
  authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: firebaseConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    // handleValidToken: async ({token, decodedToken}, headers) => {
    //   if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    //     return redirectToAdmin(request);
    //   }
    //
    //   return NextResponse.next({
    //     request: {
    //       headers
    //     }
    //   });
    // },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason });

      return redirectToLogin(request, {
        path: '/admin/login',
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });

      return redirectToLogin(request, {
        path: '/admin/login',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });

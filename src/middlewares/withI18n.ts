import createMiddleware from 'next-intl/middleware';

import { i18n } from '@/config';
import { MiddlewareFactory } from './stackMiddlewares';

export const i18nMiddleware = createMiddleware(i18n);
const PUBLIC_PATHS = ['/', '/api/login', '/api/logout'];

export const withI18n: MiddlewareFactory = next => async (request, response) => {
  console.log('withI18n', request.nextUrl.pathname);
  return i18nMiddleware(request);
};

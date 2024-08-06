import { MiddlewareFactory } from './stackMiddlewares';
import { i18n } from '@/i18n';
import createMiddleware from 'next-intl/middleware';

export const i18nMiddleware = createMiddleware(i18n);
const PUBLIC_PATHS = ['/', '/api/login', '/api/logout'];

export const withI18n: MiddlewareFactory = (next) => async (request, response) => {
  console.log('withI18n', request.nextUrl.pathname);
  return i18nMiddleware(request);
};

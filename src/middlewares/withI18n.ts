import createMiddleware from 'next-intl/middleware';

import { i18n } from '@/config';
import { MiddlewareFactory } from './stackMiddlewares';

export const i18nMiddleware = createMiddleware(i18n);
const PUBLIC_PATHS = ['/', '/api/login', '/api/logout'];

export const withI18n: MiddlewareFactory = (next) => async (request, response) => {
  return i18nMiddleware(request);
};

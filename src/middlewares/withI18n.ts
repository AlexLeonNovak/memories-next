import { MiddlewareFactory } from './stackMiddlewares';
import { i18n } from '@/i18n';
import createMiddleware from 'next-intl/middleware';

export const withI18n: MiddlewareFactory = (next) => async (request, response) => createMiddleware(i18n)(request);

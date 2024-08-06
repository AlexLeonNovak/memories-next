import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { TranslationRepository } from '@/lib/repositories';
import { checkTranslation } from '@/lib/utils';

export const i18n = {
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
} as const;

export type TLocale = (typeof i18n)['locales'][number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as TLocale)) {
    notFound();
  }

  const messages = await TranslationRepository.getMessages(locale as TLocale);

  return {
    messages,
    getMessageFallback: ({ key, namespace, error }) => {
      const path = [namespace, key].filter((part) => part != null).join('.');
      if (error.code === 'MISSING_MESSAGE') {
        checkTranslation({ key, namespace, messages });
        return key;
      }
      return 'Dear developer, please fix this message: ' + path;
    },
    timeZone: 'Europe/Kiev',
  };
});

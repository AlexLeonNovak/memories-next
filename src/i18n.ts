import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n, TLocale } from '@/config';
import { getTranslationMessages } from '@/server/swr';
import { checkTranslationsServer } from '@/server/utils';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as TLocale)) {
    notFound();
  }

  const messages = await getTranslationMessages(locale as TLocale); //await

  return {
    messages,
    getMessageFallback: ({ key, namespace, error }) => {
      const path = [namespace, key].filter((part) => part != null).join('.');
      if (error.code === 'MISSING_MESSAGE') {
        checkTranslationsServer({ key, namespace });
        return key;
      }
      return 'Dear developer, please fix this message: ' + path;
    },
    timeZone: 'Europe/Kiev',
  };
});

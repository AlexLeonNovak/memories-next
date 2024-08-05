import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { TranslationRepository } from '@/lib/repositories';
import { TQueryFilter, TQueryOptionsWhere, TTranslationEntity } from '@/types';

export const i18n = {
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
} as const;

export type TLocale = (typeof i18n)['locales'][number];

const checkTranslation = async ({ key, namespace }: { key: string; namespace?: string }) => {
  const where: TQueryFilter<TTranslationEntity>[] = [{ fieldPath: 'key', opStr: '==', value: key }];
  if (namespace) {
    where.push({ fieldPath: 'namespace', opStr: '==', value: namespace });
  }
  const translations = await TranslationRepository.getAll({ where });
  if (!translations.length) {
    await TranslationRepository.create({
      key,
      namespace,
    });
  }
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as TLocale)) {
    notFound();
  }

  return {
    messages: await TranslationRepository.getMessages(locale as TLocale),
    // getMessageFallback: ({ key, namespace, error }) => {
    //   const path = [namespace, key].filter((part) => part != null).join('.');
    //   if (error.code === 'MISSING_MESSAGE') {
    //     checkTranslation({ key, namespace });
    //     return key;
    //   }
    //   return 'Dear developer, please fix this message: ' + path;
    // },
    // timeZone: 'Europe/Kiev',
  };
});

import { i18n, TLocale } from '@/i18n';
import { AbstractIntlMessages } from 'use-intl';
import { TQueryFilter, TTranslationEntity } from '@/types';
import { TranslationRepository } from '@/lib/repositories';
import { getMessages } from 'next-intl/server';

export const defineLocaleValues = <T>(value: T) => {
  const values = {} as { [locale in TLocale]?: T };
  for (const locale of i18n.locales) {
    values[locale] = value;
  }
  return values;
};

const checking: { [key: string]: boolean } = {};

type TCheckTranslations = {
  key: string;
  namespace?: string;
  messages: AbstractIntlMessages;
};
export const checkTranslation = async ({ key, namespace, messages }: TCheckTranslations) => {
  let isValueIsset: boolean;
  if (namespace && namespace in messages) {
    isValueIsset = key in (messages[namespace] as AbstractIntlMessages);
  } else {
    isValueIsset = key in messages;
  }
  if (isValueIsset) {
    return;
  }
  if (key in checking && checking[key]) {
    return;
  }
  checking[key] = true;
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
  checking[key] = false;
};

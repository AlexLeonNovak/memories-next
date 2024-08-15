import { AbstractIntlMessages } from 'use-intl';
import { TLocale } from '@/config';
import { getCollectionCached } from '@/server/swr/base';
import { TGetAllDocuments, TTranslationEntity } from '@/types';

export const getTranslations = (params?: Omit<TGetAllDocuments<TTranslationEntity>, 'path'>) =>
  getCollectionCached<TTranslationEntity>({ path: 'translations', ...params });

export const getTranslationMessages = async (locale: TLocale) => {
  const { data: allMessages } = await getTranslations();
  const messages: AbstractIntlMessages = {};
  for (const message of allMessages) {
    const { namespace, key } = message;
    let value = message[locale];
    if (!value) {
      value = key;
    }
    if (typeof namespace !== 'undefined') {
      if (!(namespace in messages)) {
        messages[namespace] = {};
      }
      (messages[namespace] as AbstractIntlMessages)[key] = value;
    } else {
      messages[key] = value;
    }
  }
  return messages;
};

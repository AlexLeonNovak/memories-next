import { createCRUD } from '@/lib/services';
import { TTranslation } from '@/types';
import { TLocale } from '@/i18n';
import { AbstractIntlMessages } from 'use-intl';
// import { doc, query, where, groupBy } from '@firebase/firestore';

const crud = createCRUD<TTranslation>('translations');

const getMessages = async (locale: TLocale) => {
  const allMessages = await crud.getAll();
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
export const TranslationRepository = { ...crud, getMessages };

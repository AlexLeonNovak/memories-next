import { AbstractIntlMessages } from 'use-intl';
import { i18n, TLocale } from '@/config';
import { useGetTranslations } from '@/hooks';
import { createDocument } from '@/server/firebase';
import { TCheckTranslations, TTranslation } from '@/types';

export const defineLocaleValues = <T>(value: T) => {
  const values = {} as { [locale in TLocale]?: T };
  for (const locale of i18n.locales) {
    values[locale] = value;
  }
  return values;
};

// const checking: { [key: string]: boolean } = {};
//
//
// export const checkTranslations = ({ key, namespace }: TCheckTranslations) => {
//   const path = [namespace, key].filter((part) => part != null).join('.');
//   if (path in checking && checking[path]) {
//     return;
//   }
//   checking[path] = true;
//   const { data: translations } = useGetTranslations();
//   let isValueIsset: boolean;
//   const data: Partial<TTranslation> = { key };
//   if (namespace) {
//     isValueIsset = translations?.some((t) => t.namespace === namespace && t.key === key);
//     data.namespace = namespace;
//   } else {
//     isValueIsset = translations?.some((t) => t.key === key);
//   }
//   if (isValueIsset) {
//     return;
//   }
//
//   await createDocument('translations', data);
//   checking[key] = false;
// };

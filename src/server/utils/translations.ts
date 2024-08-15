import { createDocument } from '@/server/mongodb';
import { getTranslations } from '@/server/swr';
import { TCheckTranslations, TTranslation } from '@/types';

const checking: { [key: string]: boolean } = {};

export const checkTranslationsServer = async ({ key, namespace }: TCheckTranslations) => {
  const path = [namespace, key].filter(part => part != null).join('.');
  if (path in checking && checking[path]) {
    return;
  }
  checking[path] = true;
  const { data: translations } = await getTranslations();
  let isValueIsset: boolean;
  const data: Partial<TTranslation> = { key };
  if (namespace) {
    isValueIsset = translations?.some(t => t.namespace === namespace && t.key === key);
    data.namespace = namespace;
  } else {
    isValueIsset = translations?.some(t => t.key === key);
  }
  if (isValueIsset) {
    return;
  }

  await createDocument('translations', data);
  checking[key] = false;
};

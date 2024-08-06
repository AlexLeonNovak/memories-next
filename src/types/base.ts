import { TLocale } from '@/i18n';

export type TBaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type TTranslations = {
  [locale in TLocale]?: string;
};

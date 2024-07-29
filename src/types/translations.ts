import { TLocale } from '@/i18n';
import { TBaseEntity } from '.';

type TTranslations = {
  [locale in TLocale]?: string;
};

export type TTranslation = TTranslations & {
  key: string;
  namespace?: string;
};

export type TTranslationEntity = TBaseEntity & TTranslation;

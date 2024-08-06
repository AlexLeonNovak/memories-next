import { TBaseEntity, TTranslations } from '.';

export type TTranslation = TTranslations & {
  key: string;
  namespace?: string;
};

export type TTranslationEntity = TBaseEntity & TTranslation;

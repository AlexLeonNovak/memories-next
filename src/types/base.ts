import { TLocale } from '@/config';

export type ValueOf<T> = T[keyof T];

export interface TBaseEntity extends Document {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type TTranslations = {
  [locale in TLocale]?: string;
};

import { ReactNode } from 'react';
import { TLocale } from '@/i18n';

export type TChildrenProps = {
  children: ReactNode;
};

export type TLocaleProps = {
  params: {
    locale: TLocale;
  };
};

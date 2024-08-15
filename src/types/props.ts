import { ReactNode } from 'react';
import { SWRConfiguration } from 'swr';
import { TLocale } from '@/config';

export type TChildrenProps = {
  children: ReactNode;
};

export type TAppLayoutProps = {
  params: {
    locale: TLocale;
    fallback: SWRConfiguration;
  };
};

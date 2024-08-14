import { ReactNode } from 'react';
import { TLocale } from '@/config';
import { SWRConfiguration } from 'swr';

export type TChildrenProps = {
  children: ReactNode;
};

export type TAppLayoutProps = {
  params: {
    locale: TLocale;
    fallback: SWRConfiguration;
  };
};

'use client';

import { SWRConfig, SWRConfiguration } from 'swr';
import { getFirebaseApp } from '@/lib/firebase';
import { TChildrenProps } from '@/types';

type TSWRProviderProps = TChildrenProps & {
  fallback: SWRConfiguration;
};

getFirebaseApp();

export const SWRProvider = ({ children, fallback }: TSWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fallback,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

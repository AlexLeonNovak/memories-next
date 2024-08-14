'use client';

import { TChildrenProps } from '@/types';
import { SWRConfig, SWRConfiguration } from 'swr';
import { getFirebaseApp } from '@/lib/firebase';

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

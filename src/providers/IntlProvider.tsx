'use client';

import { IntlConfig, IntlError, IntlErrorCode, NextIntlClientProvider } from 'next-intl';
import { TChildrenProps, TTranslation } from '@/types';
import { useEffect, useState } from 'react';
import { useGetTranslations } from '@/hooks';
import { createTranslation } from '@/server/actions/translations.actions';

type TIntlProps = TChildrenProps & IntlConfig;

export const IntlProvider = ({ children, ...props }: TIntlProps) => {
  const { data: translations, isLoading } = useGetTranslations();
  const [checking, setChecking] = useState<{ [key: string]: boolean }>({});

  const getMessageFallback = ({ namespace, key, error }: { error: IntlError; key: string; namespace?: string }) => {
    const path = [namespace, key].filter((part) => part != null).join('.');
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      setTimeout(() => {
        if (!(path in checking)) {
          setChecking((state) => ({ ...state, [path]: true }));
        }
      });
      return key;
    }
    return 'Dear developer, please fix this message: ' + path + 'Error code: ' + error.code;
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    for (const path in checking) {
      if (!checking[path]) {
        continue;
      }
      let [namespace, key] = path.split('.');
      if (!key) {
        key = namespace;
        namespace = '';
      }
      let isValueIsset: boolean | undefined;
      const data: TTranslation = { key };
      if (namespace) {
        isValueIsset = translations?.some((t) => t.namespace === namespace && t.key === key);
        data.namespace = namespace;
      } else {
        isValueIsset = translations?.some((t) => t.key === key);
      }
      if (!isValueIsset) {
        createTranslation(data);
      }
      setChecking((state) => ({ ...state, [path]: false }));
    }
  }, [translations, checking, isLoading]);

  return (
    <NextIntlClientProvider {...props} timeZone='Europe/Kiev' now={new Date()} getMessageFallback={getMessageFallback}>
      {children}
    </NextIntlClientProvider>
  );
};

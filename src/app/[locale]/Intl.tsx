'use client';

import { IntlErrorCode, NextIntlClientProvider, IntlError, IntlConfig } from 'next-intl';
import { TChildrenProps } from '@/types';
import { checkTranslation } from '@/lib/utils';
import { getMessages } from 'next-intl/server';

function getMessageFallback({ namespace, key, error }: { error: IntlError; key: string; namespace?: string }) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    checkTranslation({ key, namespace, messages: {} });
    return key;
  }
  const path = [namespace, key].filter((part) => part != null).join('.');
  return 'Dear developer, please fix this message: ' + path + 'Error code: ' + error.code;
}

type TIntlProps = TChildrenProps & IntlConfig;

export default function Intl({ children, ...props }: TIntlProps) {
  return (
    <NextIntlClientProvider {...props} timeZone='Europe/Kiev' now={new Date()} getMessageFallback={getMessageFallback}>
      {children}
    </NextIntlClientProvider>
  );
}

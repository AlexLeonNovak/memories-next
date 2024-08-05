'use client';

import { IntlErrorCode, NextIntlClientProvider, IntlError, IntlConfig, useMessages } from 'next-intl';
import { TChildrenProps, TQueryFilter, TTranslationEntity } from '@/types';
import { TranslationRepository } from '@/lib/repositories';
import { AbstractIntlMessages } from 'use-intl';

const checking: { [key: string]: boolean } = {};

const checkTranslation = async ({ key, namespace }: { key: string; namespace?: string }) => {
  const messages = useMessages();
  let isValueIsset = false;
  if (namespace && namespace in messages) {
    isValueIsset = key in (messages[namespace] as AbstractIntlMessages);
  } else {
    isValueIsset = key in messages;
  }
  if (isValueIsset) {
    return;
  }
  if (key in checking && checking[key]) {
    return;
  }
  checking[key] = true;
  const where: TQueryFilter<TTranslationEntity>[] = [{ fieldPath: 'key', opStr: '==', value: key }];
  if (namespace) {
    where.push({ fieldPath: 'namespace', opStr: '==', value: namespace });
  }
  const translations = await TranslationRepository.getAll({ where });
  if (!translations.length) {
    await TranslationRepository.create({
      key,
      namespace,
    });
  }
  checking[key] = false;
};

function getMessageFallback({ namespace, key, error }: { error: IntlError; key: string; namespace?: string }) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    checkTranslation({ key, namespace });
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

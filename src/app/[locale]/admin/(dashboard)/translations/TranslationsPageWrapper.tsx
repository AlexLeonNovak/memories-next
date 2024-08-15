'use client';

import { useTranslations } from 'next-intl';
import { PageTitle, TranslationsTable } from '@/components/screens';

export const TranslationsPageWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Translations')} />
      <TranslationsTable />
    </div>
  );
};

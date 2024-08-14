'use client';

import { PageTitle, TranslationsTable } from '@/components/screens';
import { useTranslations } from 'next-intl';

export const TranslationsPageWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Translations')} />
      <TranslationsTable />
    </div>
  );
};

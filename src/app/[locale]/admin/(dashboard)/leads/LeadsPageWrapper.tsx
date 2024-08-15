'use client';

import { useTranslations } from 'next-intl';
import { LeadsTable, PageTitle } from '@/components/screens';

export const LeadsPageWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Leads')} />
      <LeadsTable />
    </div>
  );
};

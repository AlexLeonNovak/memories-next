'use client';

import { LeadsTable, PageTitle } from '@/components/screens';
import { useTranslations } from 'next-intl';

export const LeadsPageWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Leads')} />
      <LeadsTable />
    </div>
  );
};

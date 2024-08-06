import { LeadsTable, PageTitle } from '@/components';
import { getTranslations } from 'next-intl/server';

export default async function LeadsPage() {
  const tAdm = await getTranslations('Admin');
  return (
    <>
      <PageTitle title={tAdm('Leads')} />
      <LeadsTable />
    </>
  );
}

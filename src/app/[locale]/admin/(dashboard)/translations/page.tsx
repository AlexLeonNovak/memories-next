import { PageTitle, TranslationsTable } from '@/components';
// import { missingTranslations } from '@/lib/utils';

export default function TranslationsPage() {
  // console.log(missingTranslations);
  return (
    <>
      <PageTitle title='Translations' />
      <TranslationsTable />
    </>
  );
}

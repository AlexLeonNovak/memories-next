import { PageTitle } from '@/components';
import { notFound } from 'next/navigation';
import { CategoryFormWrapper } from './CategoryFormWrapper';
import { getCategoryById } from '@/server/swr';
import { getLocale } from 'next-intl/server';
import { TLocale } from '@/config';

type TEditCategoryPage = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params: { id } }: TEditCategoryPage) {
  const { data, key } = await getCategoryById(id);

  if (!data) {
    return notFound();
  }

  const locale = (await getLocale()) as TLocale;

  return (
    <div>
      <PageTitle title={`Edit category: "${data.name[locale]}"`} />
      <CategoryFormWrapper category={data} swrKey={key} />
    </div>
  );
}

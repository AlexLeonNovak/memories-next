import { notFound } from 'next/navigation';

import { getCategoryById } from '@/server/swr';
import { CategoryEditWrapper } from './CategoryEditWrapper';

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

  return <CategoryEditWrapper category={data} swrKey={key} />;
}

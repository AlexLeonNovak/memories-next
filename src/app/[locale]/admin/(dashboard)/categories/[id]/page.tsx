import { notFound } from 'next/navigation';
import { CategoryEditWrapper } from './CategoryEditWrapper';
import { getCategoryById } from '@/server/swr';

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

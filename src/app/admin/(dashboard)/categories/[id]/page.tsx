import { PageTitle } from '@/components';
import { fetchCategoryById } from '@/server/actions/categories.actions';
import { notFound } from 'next/navigation';
import { CategoryFormWrapper } from './CategoryFormWrapper';

type TEditCategoryPage = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params: { id } }: TEditCategoryPage) {
  const category = await fetchCategoryById(id);

  if (!category) {
    return notFound();
  }

  return (
    <div>
      <PageTitle title={`Edit category: "${category.name}"`} />
      <CategoryFormWrapper category={category} />
    </div>
  );
}

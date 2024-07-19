import {CategoryFormWrapper} from './CategoryFormWrapper';
import {fetchCategoryById} from '@/server';
import {notFound} from 'next/navigation';
import {PageTitle} from '@/components';

type TEditCategoryPage = {
  params: {
    id: string;
  }
}

export default async function EditCategoryPage({params: { id }}: TEditCategoryPage) {
  const category = await fetchCategoryById(id);

  if (!category) {
    return notFound();
  }

  return (
    <div>
      <PageTitle title={`Edit category: "${category.name}"`} />
      <h1 className="text-3xl mb-2">Edit category: &ldquo;{category.name}&rdquo;</h1>
      <CategoryFormWrapper category={category} />
    </div>
  )
}

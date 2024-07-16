import {CategoryFormWrapper} from './CategoryFormWrapper';
import {fetchCategoryById} from '@/server';
import {notFound} from 'next/navigation';

type TEditCategoryPage = {
  params: {
    id: string;
  }
}

export default async function EditCategoryPage({params: { id }}: TEditCategoryPage) {
  const category = await fetchCategoryById(id);
  console.log('category', category);
  if (!category) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl mb-2">Edit category: &ldquo;{category.name}&rdquo;</h1>
      <CategoryFormWrapper category={category} />
    </div>
  )
}

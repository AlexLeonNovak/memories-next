import {CategoryFormWrapper} from './CategoryFormWrapper';
import {fetchCategoryById} from '@/server';

type TEditCategoryPage = {
  params: {
    id: string;
  }
}

export default async function EditCategoryPage({params: { id }}: TEditCategoryPage) {
  const category = await fetchCategoryById(id);

  return (
    <div>
      <h1 className="text-3xl mb-2">Edit category: "{category.name}"</h1>
      <CategoryFormWrapper category={category} />
    </div>
  )
}

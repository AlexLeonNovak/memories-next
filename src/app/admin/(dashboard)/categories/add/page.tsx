'use client';

import {CategoryForm, PageTitle} from '@/components';
import {useRouter} from 'next/navigation';

export default function AddCategoryPage() {
  const router = useRouter();

  return (
    <div>
      <PageTitle title='Create new category' />
      <CategoryForm onFormSubmit={() => router.back()} />
    </div>
  )
}

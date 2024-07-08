'use client';

import {CategoryForm} from '@/components';
import {useRouter} from 'next/navigation';

export default function AddPostPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl mb-2">Add new category</h1>
      <CategoryForm onFormSubmit={() => router.back()} />
    </div>
  )
}

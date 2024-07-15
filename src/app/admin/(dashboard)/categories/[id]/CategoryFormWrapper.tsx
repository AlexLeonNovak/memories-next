'use client';

import {TCategoryEntity} from '@/types';
import {useRouter} from 'next/navigation';
import {CategoryForm} from '@/components';

type TCategoryFormWrapperProps = {
  category?: TCategoryEntity;
}

export const CategoryFormWrapper = ({category}: TCategoryFormWrapperProps) => {
  const router = useRouter();
  return <CategoryForm category={category} onFormSubmit={() => router.back()}/>;
}

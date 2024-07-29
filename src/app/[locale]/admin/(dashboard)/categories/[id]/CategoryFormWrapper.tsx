'use client';

import { CategoryForm } from '@/components';
import { TCategoryEntity } from '@/types';
import { useRouter } from 'next/navigation';

type TCategoryFormWrapperProps = {
  category: TCategoryEntity;
};

export const CategoryFormWrapper = ({ category }: TCategoryFormWrapperProps) => {
  const router = useRouter();
  return (
    <CategoryForm
      category={category}
      onFormSubmit={() => {
        router.back();
        router.refresh();
      }}
    />
  );
};

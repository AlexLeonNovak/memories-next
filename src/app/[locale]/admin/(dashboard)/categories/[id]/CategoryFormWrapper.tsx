'use client';

import { CategoryForm } from '@/components';
import { TCategoryEntity } from '@/types';
import { useRouter } from '@/navigation';
import { useStateStore } from '@/lib/store';

type TCategoryFormWrapperProps = {
  category: TCategoryEntity;
  swrKey: string;
};

export const CategoryFormWrapper = ({ category, swrKey }: TCategoryFormWrapperProps) => {
  const router = useRouter();
  const { setStateValue } = useStateStore();
  return (
    <CategoryForm
      category={category}
      swrKey={swrKey}
      onFormSubmit={() => {
        setStateValue('revalidateCategories', true);
        router.back();
      }}
    />
  );
};

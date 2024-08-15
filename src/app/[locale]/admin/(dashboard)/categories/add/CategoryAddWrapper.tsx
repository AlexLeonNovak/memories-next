'use client';

import { useTranslations } from 'next-intl';
import { CategoryForm, PageTitle } from '@/components/screens';
import { useStateStore } from '@/lib/store';
import { useRouter } from '@/navigation';

export const CategoryAddWrapper = () => {
  const tAdm = useTranslations('Admin');
  const router = useRouter();
  const { setStateValue } = useStateStore();
  return (
    <div>
      <PageTitle title={tAdm('Create new category')} />
      <CategoryForm
        onFormSubmit={() => {
          setStateValue('revalidateCategories', true);
          router.back();
        }}
      />
    </div>
  );
};

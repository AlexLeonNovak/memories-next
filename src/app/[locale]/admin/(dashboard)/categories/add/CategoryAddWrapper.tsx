'use client';

import { CategoryForm, PageTitle } from '@/components/screens';
import { useRouter } from '@/navigation';
import { useStateStore } from '@/lib/store';
import { useTranslations } from 'next-intl';

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

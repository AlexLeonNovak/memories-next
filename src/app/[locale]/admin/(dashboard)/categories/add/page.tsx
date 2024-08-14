'use client';

import { CategoryForm, PageTitle } from '@/components';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function AddCategoryPage() {
  const router = useRouter();
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Create new category')} />
      <CategoryForm onFormSubmit={() => router.back()} />
    </div>
  );
}

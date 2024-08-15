'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';
import { CategoryForm, PageTitle } from '@/components/screens';
import { TLocale } from '@/config';
import { useStateStore } from '@/lib/store';
import { useRouter } from '@/navigation';
import { TCategoryEntity } from '@/types';

type TCategoryFormWrapperProps = {
  category: TCategoryEntity;
  swrKey: string;
};

export const CategoryEditWrapper = ({ category, swrKey }: TCategoryFormWrapperProps) => {
  const { setStateValue } = useStateStore();
  const tAdm = useTranslations('Admin');
  const router = useRouter();
  const locale = useLocale() as TLocale;

  return (
    <div>
      <PageTitle title={tAdm(`Edit category: "{name}"`, { name: category.name[locale] })} />
      <CategoryForm
        category={category}
        swrKey={swrKey}
        onFormSubmit={() => {
          setStateValue('revalidateCategories', true);
          router.back();
        }}
      />
    </div>
  );
};

'use client';

import { CategoryForm, PageTitle } from '@/components/screens';
import { TCategoryEntity } from '@/types';
import { useRouter } from '@/navigation';
import { useStateStore } from '@/lib/store';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';
import { TLocale } from '@/config';

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

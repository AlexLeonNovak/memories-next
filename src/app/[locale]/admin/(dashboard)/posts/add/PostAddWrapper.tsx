'use client';

import { useTranslations } from 'next-intl';
import { PageTitle, PostForm } from '@/components/screens';

export const PostAddWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Create new post')} />
      <PostForm />
    </div>
  );
};

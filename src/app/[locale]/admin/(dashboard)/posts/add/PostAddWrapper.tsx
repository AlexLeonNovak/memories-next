'use client';

import { PageTitle, PostForm } from '@/components/screens';
import { useTranslations } from 'next-intl';

export const PostAddWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Create new post')} />
      <PostForm />
    </div>
  );
};

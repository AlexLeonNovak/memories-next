import { PageTitle, PostForm } from '@/components';
import { getTranslations } from 'next-intl/server';

export default async function AddPostPage() {
  const t = await getTranslations('Admin');

  return (
    <>
      <PageTitle title={t('Create new post')} />
      <PostForm />
    </>
  );
}

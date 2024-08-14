import { PageTitle, PostForm } from '@/components';
import { notFound } from 'next/navigation';
import { getMedias, getPostById } from '@/server/swr';
import { getLocale, getTranslations } from 'next-intl/server';
import { TLocale } from '@/config';

type TEditCategoryPage = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params: { id } }: TEditCategoryPage) {
  const { data: post, key } = await getPostById(id);

  if (!post) {
    return notFound();
  }

  const { data: medias } = await getMedias({ filter: { postId: post.id } });
  const locale = (await getLocale()) as TLocale;
  const t = await getTranslations('Admin');

  return (
    <>
      <PageTitle title={t('Edit post: "{name}"', { name: post.name[locale] })} />
      <PostForm post={post} swrKey={key} medias={medias} />
    </>
  );
}

import { notFound } from 'next/navigation';
import { getMedias, getPostById } from '@/server/swr';
import { PostEditWrapper } from './PostEditWrapper';

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

  return <PostEditWrapper post={post} medias={medias} swrKey={key} />;
}

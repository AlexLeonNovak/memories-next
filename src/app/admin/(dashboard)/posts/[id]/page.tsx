import {fetchCategories, fetchPostById} from '@/server';
import {notFound} from 'next/navigation';
import { PageTitle, PostForm} from '@/components';

type TEditCategoryPage = {
  params: {
    id: string;
  }
}

export default async function EditPostPage({params: { id }}: TEditCategoryPage) {
  const post = await fetchPostById(id);

  if (!post) {
    return notFound();
  }

  const categories = await fetchCategories();

  return (
    <>
      <PageTitle title={`Edit post: "${post.name}"`} />
      <PostForm post={post} categories={categories} />
    </>
  )
}

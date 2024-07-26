import {notFound} from 'next/navigation';
import { PageTitle, PostForm} from '@/components';
import {fetchPostById} from '@/server/actions/posts.actions';
import {fetchCategories} from '@/server/actions/categories.actions';

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

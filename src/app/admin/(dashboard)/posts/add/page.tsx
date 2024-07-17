import {PageTitle, PostForm} from '@/components';
import {fetchCategories} from '@/server';

export default async function AddPostPage() {
  const categories = await fetchCategories();

  return (
    <>
      <PageTitle title='Create new post' />
      <PostForm categories={categories} />
    </>
  )
}

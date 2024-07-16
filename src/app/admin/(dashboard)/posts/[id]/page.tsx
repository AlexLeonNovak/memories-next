import {fetchCategories, fetchPostById} from '@/server';
import {notFound} from 'next/navigation';
import {PostForm} from '@/components';

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
    <div>
      <h1 className="text-3xl mb-2">Edit post: &ldquo;{post.name}&rdquo;</h1>
      <PostForm post={post} categories={categories} />
    </div>
  )
}

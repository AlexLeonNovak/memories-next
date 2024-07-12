import {PostForm} from '@/components';
import {fetchCategories} from '@/server';

export default async function AddPostPage() {
  const categories = await fetchCategories();

  return (
    <div>
      <h1 className="text-3xl">Create new post</h1>
      <PostForm categories={categories} />
    </div>
  )
}

'use server';

import { createPostSchemaServer, updatePostSchemaServer } from './validations';
import { parseSchemaFormData } from '@/server/utils';
import { TDeleteFormState, TFormState, TPost, TPostEntity } from '@/types';
import { createDocument, deleteDocument, updateDocument } from '@/server/mongodb';
import { deleteMediasByPostId } from '@/server/actions/medias.actions';
import { revalidatePathLocales } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

// export const fetchPosts = (queryOptions?: TQueryOptions<TPostEntity>) => PostRepository.getAll(queryOptions);
// export const fetchPostById = (id: string) => PostRepository.getById(id);

// export const fetchPostsWithCategories = async (query?: TQueryOptions<TBaseEntity & TPost>) => {
//   const categories = await getCategories();
//   const catIds = categories.data.map((category) => category.id);
//   const posts = await fetchPosts(query);
//   return posts.map((post) => ({
//     ...post,
//     categories: post.categories
//       .filter((catId) => catIds.includes(catId))
//       .map((categoryId) => categories.find(({ id }) => categoryId === id)!),
//   }));
// };

export const createPost = async (prevState: any, formData: FormData): Promise<TFormState<TPostEntity>> => {
  try {
    const parsed = await parseSchemaFormData(createPostSchemaServer, formData);
    if (parsed.status === 'success') {
      const data = await createDocument<TPost>('posts', parsed.data);
      revalidatePathLocales('/admin/posts');
      revalidatePath('/');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return {
      status: 'fail',
      message: (e as Error).message,
    };
  }
};

export const updatePost = async (prevState: any, formData: FormData): Promise<TFormState<TPostEntity>> => {
  try {
    const parsed = await parseSchemaFormData(updatePostSchemaServer, formData);
    if (parsed.status === 'success') {
      const { id, ...rest } = parsed.data;
      const data = await updateDocument('posts', id, rest);

      revalidatePathLocales('/admin/posts');
      revalidatePath('/');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};

export const deletePost = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    await deleteDocument('posts', id);
    await deleteMediasByPostId(id);
    // await deleteDocument('medias', id);

    revalidatePathLocales('/admin/posts');
    revalidatePath('/');
    return {
      success: true,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

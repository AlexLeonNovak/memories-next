'use server';

import {createPostSchemaFD, updatePostSchemaFD} from '@/lib/validations';
import {MediaRepository, PostRepository, CategoryRepository} from '@/lib/repositories';
import {revalidatePath} from 'next/cache';
import {
  TBaseEntity,
  TDeleteFormState,
  TFormState,
  TPost,
  TPostEntity,
  TQueryOptions,
} from '@/types';
import {parseSchemaFormData} from '@/lib/validations';

export const fetchPosts = (queryOptions?: TQueryOptions<TPostEntity>) => PostRepository.getAll(queryOptions);
export const fetchPostById = (id: string) => PostRepository.getById(id);

export const fetchPostsWithCategories = async (query?: TQueryOptions<TBaseEntity & TPost>) => {
  const categories = await CategoryRepository.getAll();
  const catIds = categories.map(category => category.id);
  const posts = await fetchPosts(query);
  return posts.map(post => ({
    ...post,
    categories: post.categories.filter(catId => catIds.includes(catId)).map(categoryId =>
      categories.find(({id}) => categoryId === id)!,
    ),
  }));
};

export const createPost = async (prevState: any, formData: FormData): Promise<TFormState<TPostEntity>> => {
  try {
    const parsed = await parseSchemaFormData(createPostSchemaFD, formData);
    if (parsed.status === 'success') {
      const data = await PostRepository.create(parsed.data);
      revalidatePath('/admin/posts');
      revalidatePath('/');
      return {status: 'success', data};
    }
    return parsed;
  } catch (e) {
    return {
      status: 'fail',
      message: (e as Error).message,
    }
  }
};

export const updatePost = async (prevState: any, formData: FormData): Promise<TFormState<TPostEntity>> => {
  try {
    const parsed = await parseSchemaFormData(updatePostSchemaFD, formData);
    if (parsed.status === 'success') {
      const {id, ...rest} = parsed.data;
      const data = await PostRepository.update(id, rest);

      revalidatePath('/admin/posts');
      revalidatePath('/');

      return {status: 'success', data};
    }
    return parsed;
  } catch (e) {
    return {status: 'fail', message: (e as Error).message}
  }
};

export const deletePost = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    await PostRepository.delete(id);
    await MediaRepository.deleteMedia(id);
    revalidatePath('/admin/posts');
    revalidatePath('/');
    return {
      success: true,
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

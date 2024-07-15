'use server';

import {createPostSchemaFD} from '@/lib/validations';
import {PostRepository} from '@/lib/repositories';
import {revalidatePath} from 'next/cache';
import {EPostMediaType, TBaseEntity, TFormStateSuccess, TPost, TPostMedia, TQueryOptions} from '@/types';
import {uploadFile} from '@/lib/services';
import {cache} from 'react';
import {fetchCategories} from '@/server';
import {parseSchemaFormData} from '@/lib/validations';

export const fetchPosts = cache(PostRepository.getAll);

export const fetchPostsWithCategories = cache(async (query: TQueryOptions<TBaseEntity & TPost>) => {
  const categories = await fetchCategories();
  const catIds = categories.map(category => category.id);
  const posts = await fetchPosts(query);
  return posts.map(post => ({
    ...post,
    categories: post.categories.filter(catId => catIds.includes(catId)).map(categoryId =>
      categories.find(({ id }) => categoryId === id)!
    ),
  }));
});

export const createPost = async (prevState: any, formData: FormData) => {
  console.log(formData.get('name'));
  const parsed = parseSchemaFormData(createPostSchemaFD, formData);
  if (parsed.success) {
    const { files, ...rest } = parsed.data;
    const media: TPostMedia[] = [];
    const pathDir = new Date().getTime().toString();
    for (const file of files) {
      const type = file.type.includes('image') ? EPostMediaType.IMAGE : EPostMediaType.VIDEO;
      const url = await uploadFile(file, pathDir);
      media.push({type, url})
    }
    const post = await PostRepository.create({...rest, media });
    revalidatePath('/');
    return {
      success: true,
      data: post,
    } as TFormStateSuccess<TPost>
  }
  return parsed;
}

export const updatePost = async (prevState: any, formData: FormData) => {}

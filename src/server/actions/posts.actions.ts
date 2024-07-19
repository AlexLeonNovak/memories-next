'use server';

import {createPostSchemaFD, updatePostSchemaFD} from '@/lib/validations';
import {PostRepository} from '@/lib/repositories';
import {revalidatePath} from 'next/cache';
import {
  EPostMediaType,
  TBaseEntity,
  TDeleteFormState,
  TFormStateSuccess,
  TPost,
  TPostMedia,
  TQueryOptions,
} from '@/types';
import {deleteFile, getFileJs, uploadFile} from '@/lib/services';
import {cache} from 'react';
import {fetchCategories} from '@/server';
import {parseSchemaFormData} from '@/lib/validations';
import {getFileType} from '@/lib/utils';

export const fetchPosts = cache(PostRepository.getAll);
export const fetchPostById = cache(PostRepository.getById);

export const fetchPostsWithCategories = cache(async (query?: TQueryOptions<TBaseEntity & TPost>) => {
  const categories = await fetchCategories();
  const catIds = categories.map(category => category.id);
  const posts = await fetchPosts(query);
  return posts.map(post => ({
    ...post,
    categories: post.categories.filter(catId => catIds.includes(catId)).map(categoryId =>
      categories.find(({id}) => categoryId === id)!,
    ),
  }));
});

export const createPost = async (prevState: any, formData: FormData) => {
  const parsed = await parseSchemaFormData(createPostSchemaFD, formData);
  if (!parsed.success) {
    return parsed;
  }
  const { files, ...rest } = parsed.data;
  const media: TPostMedia[] = [];
  const pathDir = new Date().getTime().toString();
  for (const file of files) {
    const type = getFileType(file);
    const url = await uploadFile(file, pathDir);
    media.push({type, url});
  }
  const post = await PostRepository.create({...rest, media });
  revalidatePath('/');
  return {
    success: true,
    data: post,
  } as TFormStateSuccess<TPost>;
};

export const updatePost = async (prevState: any, formData: FormData) => {
  const parsed = await parseSchemaFormData(updatePostSchemaFD, formData);
  if (!parsed.success) {
    return parsed;
  }
  const { id, files, ...rest } = parsed.data;
  const media: TPostMedia[] = [];
  const post = await fetchPostById(id);
  if (post?.media) {
    const postMedia = post.media;
    for (const [idx, _media] of postMedia.entries()) {
      const postFile = await getFileJs(_media.url);
      const fileIndex = files.findIndex(
        file => file.name === postFile.name && file.size === postFile.size
      );
      if (fileIndex !== -1) {
        files.splice(fileIndex, 1);
        postMedia.splice(idx, 1);
        media.push(_media);
      }
    }
    for (const { url } of postMedia) {
      await deleteFile(url);
    }
  }
  const pathDir = new Date().getTime().toString();
  for (const file of files) {
    const type = getFileType(file);
    const url = await uploadFile(file, pathDir);
    media.push({type, url});
  }
  const updatedPost = await PostRepository.update(id, {...rest, media });

  revalidatePath('/');

  return {
    success: true,
    data: updatedPost,
  } as TFormStateSuccess<TPost>;
};

export const deletePost = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    const post = await fetchPostById(id);
    if (post?.media) {
      for (const media of post.media) {
        await deleteFile(media.url);
      }
    }
    await PostRepository.delete(id);
    revalidatePath('/');
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

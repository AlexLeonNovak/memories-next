'use server';

import {createPostSchemaFD, updatePostSchemaFD} from '@/lib/validations';
import {MediaRepository, PostRepository} from '@/lib/repositories';
import {revalidatePath} from 'next/cache';
import {
  TBaseEntity,
  TDeleteFormState, TFormState,
  TFormStateSuccess,
  TPost, TPostEntity,
  TQueryOptions,
} from '@/types';
import {deleteFile, getFileJs, uploadFile} from '@/lib/services';
import {cache} from 'react';
import {fetchCategories} from '@/server';
import {parseSchemaFormData} from '@/lib/validations';
import {getFileType} from '@/lib/utils';
import {FieldValues} from 'react-hook-form';

export const fetchPosts = cache(PostRepository.getAll);
export const fetchPostById = (id: string) => PostRepository.getById(id);

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

export const createPost = async (prevState: any, formData: FormData): Promise<TFormState<TPostEntity>> => {
  try {
    const parsed = await parseSchemaFormData(createPostSchemaFD, formData);
    if (parsed.status === 'success') {
      const data = await PostRepository.create(parsed.data);
      revalidatePath('/');
      return {status: 'success', data};
    }
    return parsed;
    // const {files, ...rest} = parsed.data;
    // const media: TPostMedia[] = [];
    // const pathDir = new Date().getTime().toString();
    // for (const file of files) {
    //   const type = getFileType(file);
    //   const url = await uploadFile(file, pathDir);
    //   media.push({type, url});
    // }

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

      revalidatePath('/');

      return {status: 'success', data};
    }
      return parsed;
    // const {id, ...rest} = parsed.data;
    // const media: TPostMedia[] = [];
    // const post = await fetchPostById(id);
    // if (post?.media) {
    //   const postMedia = post.media;
    //   for (const [idx, _media] of postMedia.entries()) {
    //     const postFile = await getFileJs(_media.url);
    //     const fileIndex = files.findIndex(
    //       file => file.name === postFile.name && file.size === postFile.size
    //     );
    //     if (fileIndex !== -1) {
    //       files.splice(fileIndex, 1);
    //       postMedia.splice(idx, 1);
    //       media.push(_media);
    //     }
    //   }
    //   for (const {url} of postMedia) {
    //     await deleteFile(url);
    //   }
    // }
    // const pathDir = new Date().getTime().toString();
    // for (const file of files) {
    //   const type = getFileType(file);
    //   const url = await uploadFile(file, pathDir);
    //   media.push({type, url});
    // }

  } catch (e) {
    return {status: 'fail', message: (e as Error).message}
  }
};

export const deletePost = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    // const post = await fetchPostById(id);
    // if (post?.media) {
    //   for (const media of post.media) {
    //     await deleteFile(media.url);
    //   }
    // }
    await PostRepository.delete(id);
    await MediaRepository.deleteMedia(id);
    revalidatePath('/');
    return {
      success: true,
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

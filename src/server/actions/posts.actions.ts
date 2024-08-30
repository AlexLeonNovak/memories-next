'use server';

import { revalidatePathLocales } from '@/lib/utils';
import { deleteMediasByPostId } from '@/server/actions/medias.actions';
import { createDocument, deleteDocument, updateDocument } from '@/server/mongodb';
import { parseSchemaFormData } from '@/server/utils';
import { TDeleteFormState, TFormState, TPost, TPostEntity } from '@/types';
import { createPostSchemaServer, updatePostSchemaServer } from './validations';

export const createPost = async (prevState: any, formData: FormData): Promise<TFormState<TPostEntity>> => {
  try {
    const parsed = await parseSchemaFormData(createPostSchemaServer, formData);
    if (parsed.status === 'success') {
      const data = await createDocument<TPost>('posts', parsed.data);
      revalidatePathLocales('/admin/posts');
      revalidatePathLocales('/');
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
      revalidatePathLocales('/');
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
    revalidatePathLocales('/');
    return {
      success: true,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

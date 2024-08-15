'use server';

import { revalidatePathLocales } from '@/lib/utils';
import { createDocument, deleteDocument, updateDocument } from '@/server/mongodb';
import { getPosts } from '@/server/swr';
import { parseSchemaFormData } from '@/server/utils';
import { TCategoryEntity, TDeleteFormState, TFormState, TPostEntity, TQueryOptions } from '@/types';
import { createCategorySchemaServer, updateCategorySchemaServer } from './validations';


// export const fetchCategories = (queryOptions?: TQueryOptions<TCategoryEntity>) =>
//   CategoryRepository.getAll(queryOptions);
//
// export const fetchCategoryById = (id: string) => CategoryRepository.getById(id);

export async function createCategory(prevState: any, formData: FormData): Promise<TFormState<TCategoryEntity>> {
  try {
    const parsed = await parseSchemaFormData(createCategorySchemaServer, formData);
    if (parsed.status === 'success') {
      const data = await createDocument('categories', parsed.data);
      revalidatePathLocales('/admin/categories');
      revalidatePathLocales('/');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
}

export async function updateCategory(prevState: any, formData: FormData): Promise<TFormState<TCategoryEntity>> {
  try {
    const parsed = await parseSchemaFormData(updateCategorySchemaServer, formData);
    if (parsed.status === 'success') {
      const { id, ...rest } = parsed.data;
      const data = await updateDocument('categories', id, rest);
      revalidatePathLocales('/admin/categories');
      revalidatePathLocales('/');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
}

export async function deleteCategory(prevState: any, formData: FormData): Promise<TDeleteFormState> {
  try {
    const id = formData.get('id') as string;
    const posts = await getPosts({ filter: { categories: id } });
    if (posts.data.length) {
      throw new Error('This category used in some posts');
    }
    id && (await deleteDocument('categories', id as string));
    revalidatePathLocales('/admin/categories');
    revalidatePathLocales('/');
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

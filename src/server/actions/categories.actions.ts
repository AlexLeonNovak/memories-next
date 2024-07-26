'use server';

import {CategoryRepository, PostRepository} from '@/lib/repositories';
import {createCategorySchemaServer, updateCategorySchema} from '@/lib/validations';
import {revalidatePath} from 'next/cache';
import {parseSchemaFormData} from '@/lib/validations';
import {TCategoryEntity, TDeleteFormState, TFormState, TQueryOptions} from '@/types';

export const fetchCategories = (queryOptions?: TQueryOptions<TCategoryEntity>) => CategoryRepository.getAll(queryOptions);

export const fetchCategoryById = (id: string) => CategoryRepository.getById(id);

export async function createCategory(prevState: any, formData: FormData): Promise<TFormState<TCategoryEntity>> {
  try {
  const parsed = await parseSchemaFormData(createCategorySchemaServer, formData);
  if (parsed.status === 'success') {
    const data = await CategoryRepository.create(parsed.data);
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { status: 'success', data };
  }
  return parsed;
  } catch (e) {
    return {status: 'fail', message: (e as Error).message}
  }
}

export async function updateCategory(prevState: any, formData: FormData): Promise<TFormState<TCategoryEntity>> {
  try {
  const parsed = await parseSchemaFormData(updateCategorySchema, formData);
  if (parsed.status === 'success') {
    const {id, ...rest} = parsed.data;
    const data = await CategoryRepository.update(id, rest);
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { status: 'success', data };
  }
  return parsed;
  } catch (e) {
    return {status: 'fail', message: (e as Error).message}
  }
}


export async function deleteCategory(prevState: any, formData: FormData): Promise<TDeleteFormState> {
  try {
    const id = formData.get('id');
    const posts = await PostRepository.getAll({
      where: {
        fieldPath: 'categories',
        opStr: 'array-contains',
        value: id,
      },
    });
    if (posts.length) {
      throw new Error('This category used in posts: ' + posts.map(({name}) => name).join(', '));
    }
    id && await CategoryRepository.delete(id as string);
    revalidatePath('/admin/categories');
    revalidatePath('/');
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

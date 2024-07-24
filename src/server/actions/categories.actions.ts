'use server';

import {CategoryRepository} from '@/lib/repositories';
import {cache} from 'react';
import {createCategorySchemaServer, updateCategorySchema} from '@/lib/validations';
import {revalidatePath} from 'next/cache';
import {parseSchemaFormData} from '@/lib/validations';
import {TCategoryEntity, TDeleteFormState, TFormState} from '@/types';
import {fetchPosts} from '@/server';

export const fetchCategories = cache(CategoryRepository.getAll);

export const fetchCategoryById = cache(CategoryRepository.getById);

export const createCategory = async (prevState: any, formData: FormData): Promise<TFormState<TCategoryEntity>> => {
  try {
  const parsed = await parseSchemaFormData(createCategorySchemaServer, formData);
  if (parsed.status === 'success') {
    const data = await CategoryRepository.create(parsed.data);
    revalidatePath('/');
    return { status: 'success', data };
  }
  return parsed;
  } catch (e) {
    return {status: 'fail', message: (e as Error).message}
  }
};

export const updateCategory = async (prevState: any, formData: FormData): Promise<TFormState<TCategoryEntity>> => {
  try {
  const parsed = await parseSchemaFormData(updateCategorySchema, formData);
  if (parsed.status === 'success') {
    const {id, ...rest} = parsed.data;
    const data = await CategoryRepository.update(id, rest);
    revalidatePath('/');
    return { status: 'success', data };
  }
  return parsed;
  } catch (e) {
    return {status: 'fail', message: (e as Error).message}
  }
};


export const deleteCategory = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id');
    const posts = await fetchPosts({
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
};

'use server';

import {CategoryRepository} from '@/lib/repositories';
import {cache} from 'react';
import {createCategorySchema, updateCategorySchema} from '@/lib/validations';
import {revalidatePath} from 'next/cache';
import {parseSchemaFormData} from '@/lib/validations';
import {TDeleteFormState} from '@/types';
import {fetchPosts} from '@/server';

export const fetchCategories = cache(CategoryRepository.getAll);

export const fetchCategoryById = cache(CategoryRepository.getById);

export const createCategory = async (prevState: any, formData: FormData) => {
  const parsed = await parseSchemaFormData(createCategorySchema, formData);
  if (parsed.success) {
    await CategoryRepository.create(parsed.data);
    revalidatePath('/');
  }
  return parsed;
};

export const updateCategory = async (prevState: any, formData: FormData) => {
  const parsed = await parseSchemaFormData(updateCategorySchema, formData);
  if (parsed.success) {
    const {id, ...data} = parsed.data;
    await CategoryRepository.update(id, data);
    revalidatePath('/');
  }
  return parsed;
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

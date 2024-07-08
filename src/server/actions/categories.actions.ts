'use server';

import {CategoryRepository} from '@/lib/repositories';
import {cache} from 'react';
import {createCategorySchema, parseFormData} from '@/lib/validations';
import {z, ZodError, ZodSchema} from 'zod';
import {TCategory, TFormState, TFormStateError, TFormStateSuccess} from '@/types';
import {revalidatePath} from 'next/cache';

export const fetchCategories = cache(() => CategoryRepository.getAll());

export const createCategory = async (prevState: any, formData: FormData) => {
  const parsed = parseFormData(createCategorySchema, formData);
  if (parsed.success) {
    await CategoryRepository.create(parsed.data);
    revalidatePath('/');
  }
  return parsed;
}

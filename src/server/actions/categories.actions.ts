'use server';

import {CategoryRepository} from '@/lib/repositories';
import {cache} from 'react';
import { createCategorySchema } from '@/lib/validations';
import {revalidatePath} from 'next/cache';
import {parseSchemaFormData} from '@/lib/validations';

export const fetchCategories = cache(CategoryRepository.getAll);

export const createCategory = async (prevState: any, formData: FormData) => {
  const parsed = parseSchemaFormData(createCategorySchema, formData);
  if (parsed.success) {
    await CategoryRepository.create(parsed.data);
    revalidatePath('/');
  }
  return parsed;
}

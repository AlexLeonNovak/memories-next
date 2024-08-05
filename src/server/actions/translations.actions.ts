'use server';

import { TFormState, TTranslationEntity } from '@/types';
import { parseSchemaFormData, updateTranslationSchema } from '@/lib/validations';
import { TranslationRepository } from '@/lib/repositories';
import { revalidatePathLocales } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const updateTranslation = async (
  prevState: any,
  formData: FormData,
): Promise<TFormState<TTranslationEntity>> => {
  try {
    const parsed = await parseSchemaFormData(updateTranslationSchema, formData);
    if (parsed.status === 'success') {
      const { id, ...rest } = parsed.data;
      const data = await TranslationRepository.update(id, rest);
      revalidatePathLocales('/admin/translations');
      revalidatePath('/');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};

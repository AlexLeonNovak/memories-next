'use server';

import { revalidatePathLocales } from '@/lib/utils';
import { createDocument, deleteDocument, updateDocument } from '@/server/mongodb';
import { parseSchemaFormData } from '@/server/utils';
import { TDeleteFormState, TFormState, TTranslation, TTranslationEntity } from '@/types';
import { updateTranslationSchemaServer } from './validations';


export const createTranslation = async (translationData: TTranslation): Promise<TFormState<TTranslationEntity>> => {
  try {
    const data = await createDocument('translations', translationData);
    // revalidatePathLocales('/admin/translations');
    // revalidatePathLocales('/');
    return { status: 'success', data };
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};

export const updateTranslation = async (
  prevState: any,
  formData: FormData,
): Promise<TFormState<TTranslationEntity>> => {
  try {
    const parsed = await parseSchemaFormData(updateTranslationSchemaServer, formData);
    if (parsed.status === 'success') {
      const { id, ...rest } = parsed.data;
      const data = await updateDocument<TTranslationEntity>('translations', id, rest);
      revalidatePathLocales('/admin/translations');
      revalidatePathLocales('/');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};

export const deleteTranslation = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id');
    id && (await deleteDocument('translations', id as string));
    revalidatePathLocales('/admin/translations');
    revalidatePathLocales('/');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};

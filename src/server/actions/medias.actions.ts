'use server';

import { deleteFile } from '@/lib/firebase';
import { bulkCreateMediasSchemaServer } from '@/server/actions/validations';
import { createDocument, deleteDocument } from '@/server/mongodb';
import { getMediasByPostId } from '@/server/swr';
import { parseSchemaFormData } from '@/server/utils';
import { TFormState, TMedia, TMediaEntity } from '@/types';

export const bulkCreateMedias = async (medias: TMedia[]): Promise<TFormState<TMediaEntity[]>> => {
  try {
    const parsed = await parseSchemaFormData(bulkCreateMediasSchemaServer, medias);
    if (parsed.status === 'success') {
      const newMedias = [];
      for (const media of parsed.data) {
        newMedias.push(createDocument('medias', media));
      }
      return { status: 'success', data: await Promise.all(newMedias) };
    }
    return parsed;
  } catch (e) {
    return {
      status: 'fail',
      message: (e as Error).message,
    };
  }
};

export const deleteMediasByPostId = async (postId: string) => {
  try {
    const medias = await getMediasByPostId(postId);
    await Promise.all(medias.data?.map(({ id, url }) => [deleteFile(url), deleteDocument('medias', id)]).flat());
    return { success: true };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export const bulkDeleteMedias = async (medias: TMediaEntity[]) => {
  try {
    await Promise.all(medias.map(({ id }) => [deleteDocument('medias', id)]).flat());
    return { success: true };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

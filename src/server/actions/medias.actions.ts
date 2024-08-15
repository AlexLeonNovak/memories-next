'use server';

// import { MediaRepository, PostRepository } from '@/lib/repositories';
import { deleteFile } from '@/lib/firebase';
import { bulkCreateMediasSchemaServer } from '@/server/actions/validations';
import { createDocument, deleteDocument } from '@/server/mongodb';
import { getMediasByPostId } from '@/server/swr';
import { parseSchemaFormData } from '@/server/utils';
import { TFormState, TMedia, TMediaEntity, TQueryOptions } from '@/types';

// export const fetchMedias = (queryOptions?: TQueryOptions<TMediaEntity>) => MediaRepository.getAll(queryOptions);
//
// export const fetchMediasWithActivePosts = async () => {
//   const medias = await fetchMedias();
//   const posts = await PostRepository.getAll();
//   const activeMedias = [];
//   for (const media of medias) {
//     const post = posts.find((post) => post.id === media.postId);
//     if (post?.isActive) {
//       activeMedias.push({ ...media, post });
//     }
//   }
//   return activeMedias;
// };

export const bulkCreateMedias = async (postId: string, medias: TMedia[]): Promise<TFormState<TMediaEntity[]>> => {
  try {
    const parsed = await parseSchemaFormData(bulkCreateMediasSchemaServer, medias);
    if (parsed.status === 'success') {
      const medias = await getMediasByPostId(postId);
      if (medias?.data?.length) {
        for (const [idx, media] of medias.data.entries()) {
          const { name, size } = media;
          const fileIndex = parsed.data.findIndex(file => file.name === name && file.size === size);
          if (fileIndex !== -1) {
            parsed.data.splice(fileIndex, 1);
            medias.data.splice(idx, 1);
          }
        }
        await Promise.all(medias.data.map(({ id, url }) => [deleteFile(url), deleteDocument('medias', id)]).flat());
      }
      const newMedias = [];
      for (const media of parsed.data) {
        newMedias.push(createDocument('medias', media));
      }
      medias.data.push(...(await Promise.all(newMedias)));
      return { status: 'success', data: medias.data };
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

    // revalidatePathLocales('/admin/posts');
    // revalidatePath('/');
    return {
      success: true,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

import path from 'path';
import { deleteFile, uploadFile } from '@/lib/firebase';
import { getFileType } from '@/lib/utils';
import { TMedia, TMediaEntity } from '@/types';

export const uploadMediaFiles = async (postId: string, files: File[], medias: TMediaEntity[] = []) => {
  const mediasToDelete = medias.filter(({ name, size }) => {
    const isIn = files.some((file) => file.name === name && file.size === size);
    files = files.filter((file) => file.name !== name && file.size !== size);
    return !isIn;
  });

  await Promise.all(mediasToDelete.map(({ url }) => deleteFile(url)));
  const mediasToCreate: TMedia[] = [];
  for (const file of files) {
    const { name, type, size, lastModified } = file;
    const url = await uploadFile(file, postId);

    mediasToCreate.push({
      name,
      type,
      mediaType: getFileType(file),
      size,
      lastModified,
      postId,
      extension: path.extname(name),
      url,
    });
  }
  return { mediasToCreate, mediasToDelete };
};

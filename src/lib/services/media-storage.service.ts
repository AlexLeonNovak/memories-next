import path from 'path';
import { deleteFile, uploadFile } from '@/lib/firebase';
import { getFileType } from '@/lib/utils';
import { TMedia, TMediaEntity } from '@/types';

export const uploadMediaFiles = async (postId: string, files: File[], medias: TMediaEntity[] = []) => {
  // const medias = await getMedias(postId);
  if (medias.length) {
    for (const [idx, media] of medias.entries()) {
      const { name, size } = media;
      const fileIndex = files.findIndex((file) => file.name === name && file.size === size);
      if (fileIndex !== -1) {
        files.splice(fileIndex, 1);
        medias.splice(idx, 1);
      }
    }
    await Promise.all(medias.map(({ url }) => [deleteFile(url)]).flat());
  }
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
    // const newMedia = await crud.create(media);
    // medias.push(newMedia);
  }
  return { mediasToCreate, mediasToDelete: medias };
};

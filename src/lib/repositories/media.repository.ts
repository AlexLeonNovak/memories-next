import path from 'path';
import { createCRUD, deleteFile, uploadFile } from '@/lib/services';
import { getFileType } from '@/lib/utils';
import { TMedia } from '@/types';

const crud = createCRUD<TMedia>('medias');

const getMedias = (postId: string) =>
  crud.getAll({
    where: { fieldPath: 'postId', opStr: '==', value: postId },
  });

const deleteMedia = async (postId: string) => {
  const medias = await getMedias(postId);

  await Promise.all(
    medias.map(({ id, url }) => {
      deleteFile(url);
      crud.delete(id);
    }),
  );
};
const saveMedia = async (postId: string, files: File[]) => {
  const medias = await getMedias(postId);
  if (medias.length) {
    for (const [idx, media] of medias.entries()) {
      const { name, size } = media;
      const fileIndex = files.findIndex((file) => file.name === name && file.size === size);
      if (fileIndex !== -1) {
        files.splice(fileIndex, 1);
        medias.splice(idx, 1);
      }
    }
    await Promise.all(medias.map(({ id, url }) => [deleteFile(url), crud.delete(id)]).flat());
  }
  for (const file of files) {
    const { name, type, size, lastModified } = file;
    const url = await uploadFile(file, postId);

    const media: TMedia = {
      name,
      type,
      mediaType: getFileType(file),
      size,
      lastModified,
      postId,
      extension: path.extname(name),
      url,
    };
    const newMedia = await crud.create(media);
    medias.push(newMedia);
  }
  return medias;
};

export default { ...crud, getMedias, saveMedia, deleteMedia };

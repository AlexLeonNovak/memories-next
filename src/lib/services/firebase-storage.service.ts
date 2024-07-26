import path from 'path';
import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getMetadata,
  getStorage,
  getStream,
  ref,
  uploadBytesResumable,
} from '@firebase/storage';
import { BUCKET_URL, getFirebaseApp } from '.';

export const UPLOADS_PATH = 'uploads';

export const getFirebaseStorage = () => {
  return getStorage(getFirebaseApp(), BUCKET_URL);
};

export const uploadFile = async (file: File, pathDir: string = '') => {
  const pathUrl = path.join(UPLOADS_PATH, pathDir, file.name);
  const imgRef = ref(getFirebaseStorage(), pathUrl);
  const imgPath = await uploadBytesResumable(imgRef, file);
  return getDownloadURL(imgPath.ref);
};

export const deleteFile = (url: string): Promise<void> => {
  const imgRef = ref(getFirebaseStorage(), url);
  return deleteObject(imgRef);
};

export const getFileJs = async (url: string): Promise<File> => {
  const imgRef = ref(getFirebaseStorage(), url);
  const { name, contentType, updated } = await getMetadata(imgRef);
  const resp = await fetch(url);
  const blob = await resp.blob();
  return new File([blob], name, {
    type: contentType,
    lastModified: new Date(updated).getTime(),
  });
};

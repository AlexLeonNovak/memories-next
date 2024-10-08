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
import path from 'path';

import { BUCKET_URL, getFirebaseApp } from './index';

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

export const deleteFile = async (url: string): Promise<void> => {
  const imgRef = ref(getFirebaseStorage(), url);
  try {
    await getDownloadURL(imgRef);
    await deleteObject(imgRef);
  } catch (e) {
    console.error(e);
  }
};

export const isFileExist = async (url: string): Promise<boolean> => {
  const imgRef = ref(getFirebaseStorage(), url);
  try {
    await getDownloadURL(imgRef);
    return true;
  } catch (e) {
    return false;
  }
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

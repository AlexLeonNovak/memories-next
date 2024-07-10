import {getDownloadURL, getStorage, ref, uploadBytesResumable} from '@firebase/storage';
import {BUCKET_URL, getFirebaseApp} from '.';
import path from 'path';

export const UPLOADS_PATH = 'uploads';

export const getFirebaseStorage = () => {
  return getStorage(getFirebaseApp(), BUCKET_URL);
}

export const uploadFile = async (file: File, pathDir: string = '') => {
  const pathUrl = path.join(UPLOADS_PATH, pathDir, file.name);
  const imgRef = ref(getFirebaseStorage(), pathUrl);
  const imgPath = await uploadBytesResumable(imgRef, file);
  return getDownloadURL(imgPath.ref);
}

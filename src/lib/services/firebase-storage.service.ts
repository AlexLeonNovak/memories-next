import {getStorage} from '@firebase/storage';
import {BUCKET_URL, getFirebaseApp} from '.';

export const getFirebaseStorage = () => {
  return getStorage(getFirebaseApp(), BUCKET_URL);
}

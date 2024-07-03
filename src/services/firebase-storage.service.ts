import {getStorage} from '@firebase/storage';
import {BUCKET_URL} from '@/lib/firebase.config';
import {getFirebaseApp} from '.';

export const getFirebaseStorage = () => {
  return getStorage(getFirebaseApp(), BUCKET_URL);
}

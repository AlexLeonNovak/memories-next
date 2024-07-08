import {getAuth, inMemoryPersistence, setPersistence} from 'firebase/auth';
import {getFirebaseApp} from '.';

export const getFirebaseAuth = () => {
  const auth = getAuth(getFirebaseApp());
  setPersistence(auth, inMemoryPersistence);
  return auth;
}

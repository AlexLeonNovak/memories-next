import {getAuth, inMemoryPersistence, browserLocalPersistence, setPersistence} from 'firebase/auth';
import {getFirebaseApp} from '.';

export const getFirebaseAuth = async () => {
  const auth = getAuth(getFirebaseApp());
  await setPersistence(auth, browserLocalPersistence);
  return auth;
}

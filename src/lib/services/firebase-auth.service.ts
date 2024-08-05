import { inMemoryPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getFirebaseApp } from '.';

export const getFirebaseAuth = async () => {
  const auth = getAuth(getFirebaseApp());
  await setPersistence(auth, inMemoryPersistence);
  // await auth.authStateReady();
  return auth;
};

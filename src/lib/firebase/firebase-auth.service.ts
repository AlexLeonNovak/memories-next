import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';

import { getFirebaseApp } from './index';

export const getFirebaseAuth = async () => {
  const auth = getAuth(getFirebaseApp());
  await setPersistence(auth, inMemoryPersistence);
  await auth.authStateReady();
  return auth;
};

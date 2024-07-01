import {getApp, getApps, initializeApp} from 'firebase/app';
import {getStorage, } from '@firebase/storage';
import {getAuth, inMemoryPersistence, setPersistence} from 'firebase/auth';
import {BUCKET_URL, firebaseConfig, serverConfig} from '@/lib/firebase.config';
import {getTokens} from 'next-firebase-auth-edge';
import {cookies} from 'next/headers';

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
};

export const getFirebaseAuth = () => {
  const auth = getAuth(getFirebaseApp());
  setPersistence(auth, inMemoryPersistence);
  return auth;
}

export const getFirebaseStorage = () => {
  return getStorage(getFirebaseApp(), BUCKET_URL);
}



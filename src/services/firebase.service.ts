import {getApp, getApps, initializeApp} from 'firebase/app';
import { firebaseConfig} from '@/lib/firebase.config';

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
};







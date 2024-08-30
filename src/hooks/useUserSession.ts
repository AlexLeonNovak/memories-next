'use client';

import { Unsubscribe } from '@firebase/util';
import { useEffect, useState } from 'react';

import { getFirebaseAuth } from '../lib/firebase';

export const useUserSession = (initSession: string | null = null) => {
  const [userUid, setUserUid] = useState(initSession);

  useEffect(() => {
    const authState = async () => {
      const auth = await getFirebaseAuth();
      return auth.onIdTokenChanged(async (authUser) => {
        console.log('onAuthStateChanged', authUser);
        setUserUid(authUser ? authUser.uid : null);
      });
    };
    let unsubscribe: Unsubscribe;
    authState().then((fn) => (unsubscribe = fn));

    return () => unsubscribe && unsubscribe();
  }, []);

  return { userUid };
};

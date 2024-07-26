'use client';

import {useState} from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {TCredentials} from '@/types';
import { getFirebaseAuth } from '@/lib/services';

export const useAuth = () => {
  const [error, setError] = useState<string>();

  const login = async ({ email, password }: TCredentials) => {
    try {
      const auth = await getFirebaseAuth();
      const cred = await signInWithEmailAndPassword(
        auth, email, password
      );
      const idToken = await cred.user.getIdToken();
      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }

  const logout = async () => {
    const auth = await getFirebaseAuth();
    await signOut(auth);
    await fetch('/api/logout');
  }

  return { login, logout, error, setError };
}

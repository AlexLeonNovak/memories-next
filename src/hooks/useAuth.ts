import {useState} from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {TCredentials} from '@/types';
import { getFirebaseAuth } from '@/services/firebase.service';

export const useAuth = () => {
  const [error, setError] = useState<string>();
  const auth = getFirebaseAuth();

  const login = async ({ email, password }: TCredentials) => {
    try {
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
    await signOut(auth);
    await fetch('/api/logout');
  }

  return { login, logout, error, setError };
}

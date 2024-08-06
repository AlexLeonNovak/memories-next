'use server';

import { parseSchemaFormData, loginSchema } from '@/lib/validations';
import { getFirebaseAuth } from '@/lib/services';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { TFormState } from '@/types';
import { UserInfo } from '@firebase/auth-types';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, SESSION_COOKIE_EXPIRES_IN } from '@/lib/constants';

export const createSession = async (value: string) =>
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_COOKIE_EXPIRES_IN,
    path: '/',
  });

export const clearSession = async () => cookies().delete(SESSION_COOKIE_NAME);

export const loginWithEmailAndPassword = async (prevState: any, formData: FormData): Promise<TFormState<UserInfo>> => {
  try {
    const parsed = await parseSchemaFormData(loginSchema, formData);
    if (parsed.status === 'success') {
      const auth = await getFirebaseAuth();
      const { email, password } = parsed.data;
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, phoneNumber, photoURL, providerId } = cred.user;
      const token = await cred.user.getIdToken();
      await createSession(token);
      return {
        status: 'success',
        data: { uid, displayName, email, phoneNumber, photoURL, providerId },
      };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};

export const logout = async () => {
  const auth = await getFirebaseAuth();
  await signOut(auth);
  await clearSession();
  return null;
};

'use server';

import { UserInfo } from '@firebase/auth-types';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_EXPIRES_IN, SESSION_COOKIE_NAME } from '@/lib/constants';
import { getFirebaseAuth } from '@/lib/firebase';
import { loginSchema } from '@/lib/validations';
import { firebaseAdminAuth } from '@/server/firebase';
import { parseSchemaFormData } from '@/server/utils';
import { TFormState } from '@/types';

export const createSession = async (tokenId: string) => {
  const session = await firebaseAdminAuth.createSessionCookie(tokenId, { expiresIn: SESSION_COOKIE_EXPIRES_IN * 1000 });
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_COOKIE_EXPIRES_IN,
    path: '/',
  });
};

export const clearSession = async () => {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!session) {
    return;
  }
  const user = await firebaseAdminAuth.verifySessionCookie(session, true);
  user && (await firebaseAdminAuth.revokeRefreshTokens(user.uid));
  cookies().delete(SESSION_COOKIE_NAME);
};

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

export const getUser = async () => {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!session) {
    return null;
  }
  return firebaseAdminAuth.verifySessionCookie(session, true);
};

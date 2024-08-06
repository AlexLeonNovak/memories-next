import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';

const {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_SIGNATURE_KEY_CURRENT,
  AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS,
  USE_SECURE_COOKIES,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
} = process.env;

export const serverConfig = {
  cookieName: AUTH_COOKIE_NAME!,
  cookieSignatureKeys: [AUTH_COOKIE_SIGNATURE_KEY_CURRENT!, AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!],
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: USE_SECURE_COOKIES === 'true',
    sameSite: 'lax' as const,
    maxAge: 12 * 60 * 60 * 24,
  },
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
  },
};

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export const BUCKET_URL = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`;

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
};

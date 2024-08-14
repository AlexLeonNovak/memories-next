import 'server-only';
import { getAuth } from 'firebase-admin/auth';
import { AppOptions, initializeApp, cert, getApp, getApps } from 'firebase-admin/app';

const {
  NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
} = process.env;

// export const serverConfig = {
//   cookieName: AUTH_COOKIE_NAME!,
//   cookieSignatureKeys: [AUTH_COOKIE_SIGNATURE_KEY_CURRENT!, AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!],
//   cookieSerializeOptions: {
//     path: '/',
//     httpOnly: true,
//     secure: USE_SECURE_COOKIES === 'true',
//     sameSite: 'lax' as const,
//     maxAge: 12 * 60 * 60 * 24,
//   },
//   serviceAccount: {
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
//     clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL!,
//     privateKey: FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
//   },
// };

const firebaseConfigServer: AppOptions = {
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  credential: cert({
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
  }),
};

// export const BUCKET_URL = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`
export const firebaseAdminApp = getApps().length ? getApp() : initializeApp(firebaseConfigServer);
export const firebaseAdminAuth = getAuth(firebaseAdminApp);

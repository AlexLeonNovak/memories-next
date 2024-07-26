import {redirect} from 'next/navigation';
import {getTokens} from 'next-firebase-auth-edge';
import {cookies} from 'next/headers';
import {firebaseConfig, getFirebaseAuth, serverConfig} from '@/lib/services';

export default async function AdminPage() {
  const tokens = await getTokens(cookies(), {
    apiKey: firebaseConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  console.log('currentUser', (await getFirebaseAuth()).currentUser);
  console.log('tokens', tokens);

  if (!tokens) {
    redirect('/auth/login');
  }

  return (
    <div>Admin dashboard</div>
  );
}


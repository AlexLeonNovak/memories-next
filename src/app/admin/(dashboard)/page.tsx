import {redirect} from 'next/navigation';
import {getTokens} from 'next-firebase-auth-edge';
import {cookies} from 'next/headers';
import {firebaseConfig, serverConfig} from '@/lib/services';

export default async function AdminPage() {
  const tokens = await getTokens(cookies(), {
    apiKey: firebaseConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    redirect('/auth/login');
  }

  return (
    <div>Admin dashboard</div>
  );
}


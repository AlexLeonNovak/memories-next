import { AdminHeader, PageContent, Sidebar } from '@/components';
import { LoaderCircle } from 'lucide-react';
import { ReactNode, Suspense } from 'react';
import { cookies } from 'next/headers';
import { firebaseConfig, getFirebaseAuth } from '@/lib/services';
import { redirect } from '@/navigation';

import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { useAuthStore } from '@/lib/store';
import { getLocale } from 'next-intl/server';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const auth = await getFirebaseAuth();
  console.log('currentUser', auth.currentUser);
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  console.log('session', session);
  if (!session) {
    redirect('/admin/login');
  }

  const locale = await getLocale();

  return (
    <html lang={locale} className='h-full'>
      <head />
      <body suppressHydrationWarning={true}>
        <div className='grid min-h-screen w-full grid-cols-[250px_1fr]'>
          <Sidebar />
          <div className='flex flex-col'>
            <AdminHeader />
            <main className='p-4 bg-gray-50 min-h-screen'>
              <div className='p-4 border bg-white h-full'>
                <Suspense fallback={<LoaderCircle className='animate-spin size-10' />}>
                  <PageContent>{children}</PageContent>
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

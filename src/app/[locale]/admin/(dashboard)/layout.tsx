import { AdminHeader, PageContent, Sidebar } from '@/components/screens';
import { LoaderCircle } from 'lucide-react';
import { ReactNode, Suspense } from 'react';
import { redirect } from '@/navigation';
import { getUser } from '@/server/actions/auth.actions';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className='grid min-h-screen w-full grid-cols-[250px_1fr]'>
      <Sidebar />
      <div className='flex flex-col bg-gray-50'>
        <AdminHeader />
        <main className='p-4'>
          <div className='p-4 border bg-white h-full'>
            <Suspense fallback={<LoaderCircle className='animate-spin size-10' />}>
              <PageContent>{children}</PageContent>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

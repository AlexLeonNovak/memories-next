import {ReactNode} from 'react';
import {AdminHeader, Sidebar} from '@/components';

export default async function AdminLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
    <head />
    <body suppressHydrationWarning={true}>
    <div className="grid min-h-screen w-full grid-cols-[250px_1fr]">
      <Sidebar/>
      <div className="flex flex-col">
        <main className="p-4 bg-gray-50 min-h-screen">
          <div className="p-4 border bg-white h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
    </body>
    </html>
  );
}

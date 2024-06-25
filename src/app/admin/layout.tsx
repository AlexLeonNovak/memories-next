import {ReactNode} from 'react';
import {Header, Sidebar} from '@/components';


export default function AdminLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
    <body>
    <div className="grid min-h-screen w-full grid-cols-[250px_1fr]">
      <Sidebar/>
      <div className="flex flex-col">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
    </body>
    </html>
  );
}

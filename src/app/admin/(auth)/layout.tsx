import {ReactNode} from 'react';

export default function AdminLayout({children}: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gray-50">
      {children}
    </div>
  );
}

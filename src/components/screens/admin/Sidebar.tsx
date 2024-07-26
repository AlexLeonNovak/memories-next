'use client';

import { Button } from '@/components';
import { useAuth } from '@/hooks';
import { CircleGauge, Contact, List, LogOut, NotebookText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavItem } from '.';

export const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogOut = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside className='flex flex-col border-r bg-gray-50'>
      <div className='flex h-[60px] items-center justify-center border-b'>
        <Link href='/admin' className='text-3xl'>
          <Image src='/logo.svg' alt='Zberezhemo logo' width={175} priority height={37} />
        </Link>
      </div>
      <div className='p-4'>
        <NavItem href='/admin'>
          <CircleGauge />
          <span>Dashboard</span>
        </NavItem>

        <NavItem href='/admin/posts'>
          <NotebookText />
          <span>Posts</span>
        </NavItem>

        <NavItem href='/admin/categories'>
          <List />
          <span>Categories</span>
        </NavItem>

        <NavItem href='/admin/leads'>
          <Contact />
          <span>Leads</span>
        </NavItem>
      </div>
      <div className='p-4 flex mt-auto'>
        <Button onClick={handleLogOut} className='flex items-center gap-2 font-semibold w-full'>
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

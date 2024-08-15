'use client';

import { CircleGauge, Contact, Languages, List, NotebookText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/navigation';
import { NavItem } from '.';

export const Sidebar = () => {
  const tAdm = useTranslations('Admin');

  return (
    <aside className="flex flex-col border-r bg-gray-50">
      <div className="flex h-[60px] items-center justify-center border-b">
        <Link href="/admin" className="text-3xl">
          <Image src="/logo.svg" alt="Zberezhemo logo" width={175} priority height={37} />
        </Link>
      </div>
      <div className="p-4">
        <NavItem href="/admin">
          <CircleGauge />
          <span>{tAdm('Dashboard')}</span>
        </NavItem>

        <NavItem href="/admin/posts">
          <NotebookText />
          <span>{tAdm('Posts')}</span>
        </NavItem>

        <NavItem href="/admin/categories">
          <List />
          <span>{tAdm('Categories')}</span>
        </NavItem>

        <NavItem href="/admin/leads">
          <Contact />
          <span>{tAdm('Leads')}</span>
        </NavItem>

        <NavItem href="/admin/translations">
          <Languages />
          <span>{tAdm('Translations')}</span>
        </NavItem>
      </div>
      <div className="p-4 flex mt-auto"></div>
    </aside>
  );
};

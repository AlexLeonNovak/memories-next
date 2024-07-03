'use client';

import Link from 'next/link';
import {clsx} from 'clsx';
import {TChildrenProps} from '@/types';
import {usePathname} from 'next/navigation';

type TProps = TChildrenProps & {
  href: string;
}
export const NavItem = ({ href, children }: TProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50',
        {
          'bg-gray-200 dark:bg-gray-800': pathname === href
        }
      )}
    >
      {children}
    </Link>
  )
}

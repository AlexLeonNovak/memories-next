'use client';

import { clsx } from 'clsx';
import { Link, usePathname } from '@/navigation';
import { TChildrenProps } from '@/types';

type TProps = TChildrenProps & {
  href: string;
};
export const NavItem = ({ href, children }: TProps) => {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((i) => i && i !== 'admin');
  const hrefParts = href.split('/').filter((i) => i && i !== 'admin');

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50',
        {
          'bg-gray-200 dark:bg-gray-800': pathParts.some((p) => hrefParts.includes(p)),
        },
      )}
    >
      {children}
    </Link>
  );
};

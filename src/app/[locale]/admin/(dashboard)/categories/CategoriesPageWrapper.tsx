'use client';

import { CategoriesTable, PageTitle } from '@/components/screens';
import { Button } from '@/components/ui';
import { Link } from '@/navigation';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const CategoriesPageWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Categories')} />
      <div className='row'>
        <Button asChild>
          <Link href='categories/add'>
            <Plus />
            <span>{tAdm('Add new category')}</span>
          </Link>
        </Button>
      </div>
      <CategoriesTable />
    </div>
  );
};

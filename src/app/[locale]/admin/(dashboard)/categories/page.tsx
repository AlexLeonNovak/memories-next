'use client';

import { Button, CategoriesTable, PageTitle } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function CategoryPage() {
  const t = useTranslations('Admin');
  return (
    <>
      <PageTitle title={t('Categories')} />
      <div className='row'>
        <Button asChild>
          <Link href='categories/add'>
            <Plus />
            <span>{t('Add new category')}</span>
          </Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  );
}

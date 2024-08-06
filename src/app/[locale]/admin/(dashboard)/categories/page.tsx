'use client';

import { Button, CategoriesTable, PageTitle } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from '@/navigation';

export default function CategoryPage() {
  return (
    <>
      <PageTitle title='Categories' />
      <div className='row'>
        <Button asChild>
          <Link href='categories/add'>
            <Plus />
            <span>Add new category</span>
          </Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  );
}

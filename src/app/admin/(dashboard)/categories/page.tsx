import {Button, CategoriesTable, PageTitle} from '@/components';
// import {HydrationBoundary} from '@tanstack/react-query';
// import {categoriesListDehydrator} from '@/server';
import Link from 'next/link';
import {Plus} from 'lucide-react';

export default function CategoryPage() {

  return (
    <div>
      <PageTitle title="Categories"/>
      <div className="row">
        <Button asChild>
          <Link href="categories/add">
            <Plus/>
            <span>Add new category</span>
          </Link>
        </Button>
      </div>
      {/*<HydrationBoundary state={categoriesState}>*/}
        <CategoriesTable/>
      {/*</HydrationBoundary>*/}
    </div>
  )
}

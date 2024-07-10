import {Button, CategoriesTable, PageTitle} from '@/components';
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
        <CategoriesTable/>
    </div>
  )
}

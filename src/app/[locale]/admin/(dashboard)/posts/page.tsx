'use client';

import { Button, PageTitle, PostsTable } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from '@/navigation';

export default function PostsPage() {
  return (
    <>
      <PageTitle title='Posts' />
      <div className='row'>
        <Button asChild>
          <Link href='posts/add'>
            <Plus />
            <span>Add new post</span>
          </Link>
        </Button>
      </div>
      <PostsTable />
    </>
  );
}

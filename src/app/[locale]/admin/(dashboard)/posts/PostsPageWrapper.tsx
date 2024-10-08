'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PageTitle, PostsTable } from '@/components/screens';
import { Button } from '@/components/ui';
import { Link } from '@/navigation';

export const PostsPageWrapper = () => {
  const tAdm = useTranslations('Admin');

  return (
    <div>
      <PageTitle title={tAdm('Posts')} />
      <div className='row'>
        <Button asChild>
          <Link href='posts/add'>
            <Plus />
            <span>{tAdm('Add new post')}</span>
          </Link>
        </Button>
      </div>
      <PostsTable />
    </div>
  );
};

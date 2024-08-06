'use client';

import { Button, PageTitle, PostsTable } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function PostsPage() {
  const t = useTranslations('Admin');

  return (
    <>
      <PageTitle title={t('Posts')} />
      <div className='row'>
        <Button asChild>
          <Link href='posts/add'>
            <Plus />
            <span>{t('Add new post')}</span>
          </Link>
        </Button>
      </div>
      <PostsTable />
    </>
  );
}

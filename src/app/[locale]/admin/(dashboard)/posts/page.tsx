import { Button, PageTitle, PostsTable } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export default async function PostsPage() {
  const t = await getTranslations('Admin');

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

'use client';

import {
  Badge,
  Button,
  DeleteForm,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from '@/components';
import { deletePost, fetchPostsWithCategories } from '@/server/actions/posts.actions';
import { Pencil } from 'lucide-react';
import { Link } from '@/navigation';
import { TLocale } from '@/i18n';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';
import { TPostWithCategories } from '@/types';

export const PostsTable = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<TPostWithCategories[]>([]);
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminPosts');
  const locale = useLocale() as TLocale;

  useEffect(() => {
    fetchPostsWithCategories({
      order: { createdAt: 'desc' },
    })
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tAdm('#')}</TableHead>
          <TableHead>{tAdm('Name')}</TableHead>
          <TableHead>{tAdm('Categories')}</TableHead>
          <TableHead>{tAdm('Is active')}</TableHead>
          <TableHead>{tAdm('Actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <TableSkeleton columns={5} />}
        {posts &&
          posts.map(({ id, name, categories, isActive }, index) => (
            <TableRow key={id}>
              <TableCell>{++index}</TableCell>
              <TableCell>
                {typeof name === 'object'
                  ? Object.entries(name).map(([locale, value]) => (
                      <p key={locale} className='space-x-1'>
                        <span className='text-muted-foreground uppercase'>{tAdm(`[${locale}]`)}</span>
                        <span>{value}</span>
                      </p>
                    ))
                  : name}
              </TableCell>
              <TableCell>
                <div className='flex flex-wrap gap-1'>
                  {categories.map(({ id, name }) => (
                    <Badge key={id}>{name[locale]}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={isActive ? 'success' : 'destructive'}>
                  {isActive ? tAdm('Active') : tAdm('No active')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <DeleteForm
                    id={id}
                    deleteAction={deletePost}
                    title={t('Delete post?')}
                    description={t('Are you sure you want to delete this post?')}
                  />
                  <Button asChild variant='ghost'>
                    <Link href={`posts/${id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

        {!posts?.length && !loading && (
          <TableRow>
            <TableCell colSpan={5}>
              <p className='text-center text-2xl text-muted-foreground'>{tAdm('There are no items to display yet')}</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

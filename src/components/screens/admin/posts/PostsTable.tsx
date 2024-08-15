'use client';

import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useLocale } from 'use-intl';
import { DeleteForm } from '@/components/screens';
import { TableSkeleton } from '@/components/shared';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { i18n, TLocale } from '@/config';
import { useGetCategories, useGetPosts } from '@/hooks';
import { useStateStore } from '@/lib/store';
import { Link } from '@/navigation';
import { deletePost } from '@/server/actions/posts.actions';

export const PostsTable = () => {
  const { getStateValue, deleteStateValue } = useStateStore();
  const posts = useGetPosts();
  const categories = useGetCategories();
  const isLoading = posts.isLoading && categories.isLoading;
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminPosts');
  const locale = useLocale() as TLocale;

  useEffect(() => {
    for (const error of [posts.error, categories.error]) {
      error && 'message' in error && toast.error(error.message);
      console.error(error);
    }
  }, [posts.error, categories.error]);

  useEffect(() => {
    const isRevalidate = getStateValue('revalidatePosts');
    if (isRevalidate) {
      posts.mutate();
      posts.revalidate();
      deleteStateValue('revalidatePosts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {isLoading && <TableSkeleton columns={5} />}
        {posts.data?.map(({ id, name, categories: catIds, isActive }, index) => (
          <TableRow key={id}>
            <TableCell>{++index}</TableCell>
            <TableCell>
              {i18n.locales.map((locale) => (
                <p key={locale} className='space-x-1'>
                  <span className='text-muted-foreground uppercase'>{tAdm(`[${locale}]`)}</span>
                  <span>{name[locale]}</span>
                </p>
              ))}
            </TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                {catIds?.length &&
                  categories.data
                    ?.filter((c) => catIds.includes(c.id))
                    .map(({ id, name }) => <Badge key={id}>{name[locale]}</Badge>)}
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
                  onDeleted={() => posts.mutate()}
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

        {!posts.data?.length && !posts.isLoading && (
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

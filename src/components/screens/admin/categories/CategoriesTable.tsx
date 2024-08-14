'use client';

import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { deleteCategory } from '@/server/actions/categories.actions';
import { Pencil } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useGetCategories } from '@/hooks';
import { toast } from 'sonner';
import { i18n } from '@/config';
import { useStateStore } from '@/lib/store';
import { TableSkeleton } from '@/components/shared';
import { DeleteForm } from '@/components/screens';

export const CategoriesTable = () => {
  const { getStateValue } = useStateStore();
  const { data: categories, isLoading, error, mutate } = useGetCategories();
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminCategories');

  useEffect(() => {
    error && 'message' in error && toast.error(error.message);
    console.error(error);
  }, [error]);

  useEffect(() => {
    const isRevalidate = getStateValue('revalidateCategories');
    isRevalidate && mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tAdm('#')}</TableHead>
          <TableHead>{tAdm('Name')}</TableHead>
          <TableHead>{tAdm('Is active')}</TableHead>
          <TableHead>{tAdm('Actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton columns={4} />
        ) : (
          categories?.map(({ id, name, isActive }, index) => (
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
                <Badge variant={isActive ? 'success' : 'destructive'}>
                  {isActive ? tAdm('Active') : tAdm('No active')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <DeleteForm
                    id={id}
                    onDeleted={() => mutate()}
                    deleteAction={deleteCategory}
                    title={t('Delete category?')}
                    description={t('Are you sure you want to delete this category?')}
                  />
                  <Button asChild variant='ghost'>
                    <Link href={`categories/${id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
        {!categories?.length && !isLoading && (
          <TableRow>
            <TableCell colSpan={4}>
              <p className='text-center text-2xl text-muted-foreground'>{tAdm('There are no items to display yet')}</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

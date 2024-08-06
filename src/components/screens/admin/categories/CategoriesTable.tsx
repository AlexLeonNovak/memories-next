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
import { deleteCategory, fetchCategories } from '@/server/actions/categories.actions';
import { Pencil } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { TCategoryEntity } from '@/types';

export const CategoriesTable = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<TCategoryEntity[]>([]);
  // const categories = await fetchCategories();
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminCategories');

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
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
        {loading && <TableSkeleton columns={4} />}
        {categories &&
          categories?.map(({ id, name, isActive }, index) => (
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
                <Badge variant={isActive ? 'success' : 'destructive'}>
                  {isActive ? tAdm('Active') : tAdm('No active')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <DeleteForm
                    id={id}
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
          ))}
        {!categories?.length && !loading && (
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

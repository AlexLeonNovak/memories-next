// 'use client';

import { Badge, Button, DeleteForm, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';
import { deleteCategory, fetchCategories } from '@/server/actions/categories.actions';
import { Pencil } from 'lucide-react';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export const CategoriesTable = async () => {
  const categories = await fetchCategories();
  const tAdm = await getTranslations('Admin');
  const t = await getTranslations('AdminCategories');

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
        {!categories?.length && (
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

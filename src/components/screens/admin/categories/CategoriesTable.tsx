// 'use client';

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from '@/components';
import {fetchCategories, deleteCategory} from '@/server';
import {DeleteForm} from '@/components/screens/admin/DeleteForm';

export const CategoriesTable = async () => {
  const categories = await fetchCategories();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Is active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { categories && categories?.map(({ id, name, isActive }, index) => (
          <TableRow key={id}>
            <TableCell>{++index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              <Badge variant={isActive ? 'success' : 'destructive'}>
                {isActive ? 'Active' : 'No active'}
              </Badge>
            </TableCell>
            <TableCell>
              <DeleteForm id={id}
                          deleteAction={deleteCategory}
                          title='Delete category?'
                          description='Are you sure you want to delete this category?'
              />
            </TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}

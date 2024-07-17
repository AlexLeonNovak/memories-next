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
  DeleteForm,
} from '@/components';
import {fetchCategories, deleteCategory} from '@/server';
import Link from 'next/link';
import {Pencil} from 'lucide-react';

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
            <TableCell className="flex gap-2">
              <DeleteForm id={id}
                          deleteAction={deleteCategory}
                          title='Delete category?'
                          description='Are you sure you want to delete this category?'
              />
              <Button asChild variant='ghost'>
                <Link href={`categories/${id}`}>
                  <Pencil />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
        { !categories?.length && (
          <TableRow>
            <TableCell colSpan={4}>
              <p className="text-center text-2xl text-muted-foreground">There are no items to display yet</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

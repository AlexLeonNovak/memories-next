// 'use client';

import {Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton} from '@/components';
import {fetchCategories} from '@/server';

export const CategoriesTable = async () => {
  // const { data, isLoading } = useCategories();
  const categories = await fetchCategories();

  // if (isLoading) {
  //   return <TableSkeleton />;
  // }

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
            <TableCell>delete, update</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}

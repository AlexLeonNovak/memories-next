import {Badge, Button, DeleteForm, Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components';
import {deletePost, fetchPostsWithCategories} from '@/server';
import Link from 'next/link';
import {Pencil} from 'lucide-react';

export const PostsTable = async () => {
  const posts = await fetchPostsWithCategories({
    order: {'createdAt': 'desc'},
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Is active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          { posts && posts.map(({ id, name, categories, isActive }, index) => (
            <TableRow key={id}>
              <TableCell>{ ++index }</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell className="flex flex-wrap gap-1">
                {categories.map(({ id, name }) => (
                  <Badge key={id}>{name}</Badge>
                ))}
              </TableCell>
              <TableCell>
                <Badge variant={isActive ? 'success' : 'destructive'}>
                  {isActive ? 'Active' : 'No active'}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <DeleteForm id={id}
                            deleteAction={deletePost}
                            title='Delete category?'
                            description='Are you sure you want to delete this category?'
                />
                <Button asChild variant='ghost'>
                  <Link href={`posts/${id}`}>
                    <Pencil />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

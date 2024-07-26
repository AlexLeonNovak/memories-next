import {Badge, Button, DeleteForm, Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components';
import {deletePost, fetchPostsWithCategories} from '@/server/actions/posts.actions';
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
              <TableCell>
                <div className="flex flex-wrap gap-1">
                {categories.map(({ id, name }) => (
                  <Badge key={id}>{name}</Badge>
                ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={isActive ? 'success' : 'destructive'}>
                  {isActive ? 'Active' : 'No active'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
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
                </div>
              </TableCell>
            </TableRow>
          ))}

        { !posts?.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <p className="text-center text-2xl text-muted-foreground">There are no items to display yet</p>
            </TableCell>
          </TableRow>
        )}

      </TableBody>
    </Table>
  )
}

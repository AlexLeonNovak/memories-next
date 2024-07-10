import {Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components';
import { fetchPostsWithCategories} from '@/server';

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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          { posts && posts.map(({ id, name, categories }, index) => (
            <TableRow key={id}>
              <TableCell>{ ++index }</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell className="flex flex-wrap gap-1">
                {categories.map(({ id, name }) => (
                  <Badge key={id}>{name}</Badge>
                ))}
              </TableCell>
              <TableCell>delete, update</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

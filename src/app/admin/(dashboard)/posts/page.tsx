import {Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components';
import {Plus} from 'lucide-react';
import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Posts</h1>
      <div className="row">
        <Button asChild>
          <Link href="posts/add">
            <Plus />
            <span>Add new post</span>
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>name</TableCell>
            <TableCell>desc</TableCell>
            <TableCell>delete, update</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

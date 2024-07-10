import {Button, PostsTable} from '@/components';
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
      <PostsTable />
    </div>
  )
}

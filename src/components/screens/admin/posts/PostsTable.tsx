import { Badge, Button, DeleteForm, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';
import { deletePost, fetchPostsWithCategories } from '@/server/actions/posts.actions';
import { Pencil } from 'lucide-react';
import { Link } from '@/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { TLocale } from '@/i18n';

export const PostsTable = async () => {
  const tAdm = await getTranslations('Admin');
  const t = await getTranslations('AdminPosts');
  const locale = (await getLocale()) as TLocale;

  const posts = await fetchPostsWithCategories({
    order: { createdAt: 'desc' },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tAdm('#')}</TableHead>
          <TableHead>{tAdm('Name')}</TableHead>
          <TableHead>{tAdm('Categories')}</TableHead>
          <TableHead>{tAdm('Is active')}</TableHead>
          <TableHead>{tAdm('Actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts &&
          posts.map(({ id, name, categories, isActive }, index) => (
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
                <div className='flex flex-wrap gap-1'>
                  {categories.map(({ id, name }) => (
                    <Badge key={id}>{name[locale]}</Badge>
                  ))}
                </div>
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
                    deleteAction={deletePost}
                    title={t('Delete post?')}
                    description={t('Are you sure you want to delete this post?')}
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

        {!posts?.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <p className='text-center text-2xl text-muted-foreground'>{tAdm('There are no items to display yet')}</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { deleteLead } from '@/server/actions/leads.actions';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useGetLeads } from '@/hooks';
import { TableSkeleton } from '@/components/shared';
import { DeleteForm } from '@/components/screens';

export const LeadsTable = () => {
  const { data, mutate, isLoading } = useGetLeads();

  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminLeads');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tAdm('#')}</TableHead>
          <TableHead>{tAdm('Name')}</TableHead>
          <TableHead>{tAdm('Organisation')}</TableHead>
          <TableHead>{tAdm('Phone')}</TableHead>
          <TableHead>{tAdm('Email')}</TableHead>
          <TableHead>{tAdm('Created at')}</TableHead>
          <TableHead>{tAdm('Actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableSkeleton columns={7} />}
        {!isLoading &&
          data?.map(({ id, name, organisation, phone, email, createdAt }, index) => (
            <TableRow key={id}>
              <TableCell>{++index}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{organisation}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{DateTime.fromISO(createdAt).toFormat('yyyy-LL-dd HH:mm')}</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <DeleteForm
                    id={id}
                    deleteAction={deleteLead}
                    title={t('Delete lead?')}
                    description={t('Are you sure you want to delete this lead?')}
                    onDeleted={() => mutate()}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        {!data?.length && !isLoading && (
          <TableRow>
            <TableCell colSpan={7}>
              <p className='text-center text-2xl text-muted-foreground'>{tAdm('There are no items to display yet')}</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

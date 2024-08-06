'use client';

import { DeleteForm, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/components';
import { deleteLead, fetchLeads } from '@/server/actions/leads.actions';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TLeadEntity } from '@/types';

export const LeadsTable = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<TLeadEntity[]>([]);

  useEffect(() => {
    fetchLeads({
      order: { createdAt: 'desc' },
    })
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

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
        {loading && <TableSkeleton columns={7} />}
        {leads &&
          leads.map(({ id, name, organisation, phone, email, createdAt }, index) => (
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
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        {!leads.length && !loading && (
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

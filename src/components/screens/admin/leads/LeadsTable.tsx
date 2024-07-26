import { DeleteForm, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';
import { deleteLead, fetchLeads } from '@/server/actions/leads.actions';
import { DateTime } from 'luxon';

export const LeadsTable = async () => {
  const leads = await fetchLeads({
    order: { createdAt: 'desc' },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Organisation</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
                    title='Delete lead?'
                    description='Are you sure you want to delete this lead?'
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        {!leads.length && (
          <TableRow>
            <TableCell colSpan={7}>
              <p className='text-center text-2xl text-muted-foreground'>There are no items to display yet</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

'use client';

import { Skeleton, TableCell, TableRow } from '@/components/ui';

type TTableSkeletonProps = {
  rows?: number;
  columns?: number;
};
export const TableSkeleton = ({ rows = 3, columns = 4 }: TTableSkeletonProps) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={`row-${i}`}>
          {[...Array(columns)].map((_, j) => (
            <TableCell key={`col-${i}-${j}`}>
              <Skeleton className="h-7 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

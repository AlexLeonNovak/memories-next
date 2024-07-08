import {Skeleton} from '@/components';

export const TableSkeleton = () => {
  const Row = () => (
    <div className="flex items-center justify-between gap-2">
      <Skeleton className="h-5 w-14" />
      <Skeleton className="h-5 grow w-24" />
      <Skeleton className="h-5 grow w-32" />
      <Skeleton className="h-5 w-14" />
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {[...Array(3)].map((_, i) => (<Row key={i} />))}
    </div>
  )
}

import { TGetAllDocuments, TLeadEntity } from '@/types';
import { useGetDocs } from '@/hooks';

export const useGetLeads = (params?: Omit<TGetAllDocuments<TLeadEntity>, 'path'>) =>
  useGetDocs<TLeadEntity>({ path: 'leads', ...params });

// export const useGetLeads: TUseSWRArgs<typeof useGetDocs<TLeadEntity>, 'path'> = (params, swrOptions) =>
//   useGetDocs<TLeadEntity>({ path: COLLECTION_PATH.LEADS, ...(params || {}) }, swrOptions);

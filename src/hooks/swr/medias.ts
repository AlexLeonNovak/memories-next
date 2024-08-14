import { useGetDocs } from '@/hooks';
import { TGetAllDocuments, TMediaEntity } from '@/types';

export const useGetMedias = (params?: Omit<TGetAllDocuments<TMediaEntity>, 'path'>) =>
  useGetDocs<TMediaEntity>({ path: 'medias', ...params });

// export const useGetMedias: TUseSWRArgs<typeof useGetDocs<TMediaEntity>, 'path'> = (params, swrOptions) =>
//   useGetDocs<TMediaEntity>({ path: COLLECTION_PATH.MEDIAS, ...(params || {}) }, swrOptions);

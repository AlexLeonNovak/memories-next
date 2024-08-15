import { useGetDocs } from '@/hooks';
import { TCategoryEntity, TGetAllDocuments } from '@/types';

export const useGetCategories = (params?: Omit<TGetAllDocuments<TCategoryEntity>, 'path'>) =>
  useGetDocs<TCategoryEntity>({ path: 'categories', ...params });
// export const useGetCategories: TUseSWRArgs<typeof useGetDocs<TCategoryEntity>, 'path'> = (params, swrOptions) =>
//   useGetDocs<TCategoryEntity>({ path: COLLECTION_PATH.CATEGORIES, ...(params || {}) }, swrOptions);

// export const useGetCategoriesCount: TUseSWRArgs<typeof useCollectionCount<TCategoryEntity>, 'path'> = (
//   params,
//   swrOptions,
// ) => useCollectionCount<TCategoryEntity>({ path: COLLECTION_PATH.CATEGORIES, ...(params || {}) }, swrOptions);

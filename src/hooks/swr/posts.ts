import { useGetDocs } from '@/hooks';
import { TGetAllDocuments, TPostEntity } from '@/types';

export const useGetPosts = (params?: Omit<TGetAllDocuments<TPostEntity>, 'path'>) =>
  useGetDocs<TPostEntity>({ path: 'posts', ...params });

// export const useGetPosts: TUseSWRArgs<typeof useGetDocs<TPostEntity>, 'path'> = (params, swrOptions) =>
//   useGetDocs<TPostEntity>({ path: COLLECTION_PATH.POSTS, ...(params || {}) }, swrOptions);

// export const useGetPostsCount: TUseSWRArgs<typeof useCollectionCount<TPostEntity>, 'path'> = (params, swrOptions) =>
//   useCollectionCount<TPostEntity>({ path: COLLECTION_PATH.POSTS, ...(params || {}) }, swrOptions);

import { TGetAllDocuments, TMediaEntity } from '@/types';
import { getCollectionCached } from '@/server/swr/base';

export const getMedias = (params?: Omit<TGetAllDocuments<TMediaEntity>, 'path'>) =>
  getCollectionCached<TMediaEntity>({ path: 'medias', ...params });

export const getMediasByPostId = (postId: string, params?: Omit<TGetAllDocuments<TMediaEntity>, 'path'>) =>
  getMedias({ filter: { postId, ...params?.filter }, ...params?.options });

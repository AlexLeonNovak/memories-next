import { TGetAllDocuments, TPostEntity } from '@/types';
import { getCollectionCached, getDocCached } from '@/server/swr/base';

export const getPosts = async (params?: Omit<TGetAllDocuments<TPostEntity>, 'path'>) =>
  getCollectionCached<TPostEntity>({ path: 'posts', ...params });

export const getPostById = (id: string) => getDocCached<TPostEntity>({ path: 'posts', id });

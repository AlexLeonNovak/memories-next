import { getCollectionCached, getDocCached } from '@/server/swr/base';
import { TGetAllDocuments, TPostEntity } from '@/types';

export const getPosts = async (params?: Omit<TGetAllDocuments<TPostEntity>, 'path'>) =>
  getCollectionCached<TPostEntity>({ path: 'posts', ...params });

export const getPostById = (id: string) => getDocCached<TPostEntity>({ path: 'posts', id });

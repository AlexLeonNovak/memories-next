import { TCategoryEntity, TGetAllDocuments } from '@/types';
import { COLLECTION_PATH } from '@/lib/constants';
import { getCollectionCached, getDocCached } from '.';

export const getCategories = (params?: Omit<TGetAllDocuments<TCategoryEntity>, 'path'>) =>
  getCollectionCached<TCategoryEntity>({ path: 'categories', ...params });

export const getCategoryById = (id: string) => getDocCached<TCategoryEntity>({ path: 'categories', id });

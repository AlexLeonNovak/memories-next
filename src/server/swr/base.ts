import { unstable_cache as cache, revalidateTag } from 'next/cache';
import { unstable_serialize } from 'swr';
import { getAllDocuments, getDocumentById } from '@/server/mongodb';
import { TDocParams, TGetAllDocuments } from '@/types';

export const getCollectionCached = async <T extends Document>(params: TGetAllDocuments<T>) => {
  const key = unstable_serialize(JSON.parse(JSON.stringify(params)));
  const data = await cache(() => getAllDocuments<T>(params), [key], { tags: [key] })();
  const revalidate = () => revalidateTag(key);
  return { key, data, revalidate };
};

export const getDocCached = async <T>(params: TDocParams) => {
  const key = unstable_serialize(JSON.parse(JSON.stringify(params)));
  const { path, id } = params;
  const data = await cache(() => getDocumentById<T>(path, id), [key], { tags: [key] })();
  const revalidate = () => revalidateTag(key);
  return { key, data, revalidate };
};

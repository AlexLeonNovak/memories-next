import useSWR from 'swr';
import { getAllAction, getByIdAction, revalidateAction } from '@/server/actions/base.actions';
import { TDocParams, TGetAllDocuments } from '@/types';

export const useGetDocs = <T extends Document>(params: TGetAllDocuments<T>) => {
  const key = JSON.parse(JSON.stringify(params));
  const fetcher = () => getAllAction<T>(params);
  const revalidate = () => revalidateAction(key);

  return { revalidate, key, ...useSWR(key, fetcher) };
};

export const useGetDoc = <T>(params: TDocParams) => {
  const key = JSON.parse(JSON.stringify(params));
  const fetcher = () => getByIdAction<T>(params.path, params.id);
  const revalidate = () => revalidateAction(key);

  return { revalidate, key, ...useSWR(key, fetcher) };
};

import { TDocParams, TGetAllDocuments } from '@/types';
import { getAllAction, getByIdAction } from '@/server/actions/base.actions';
import useSWR from 'swr';

export const useGetDocs = <T extends Document>(params: TGetAllDocuments<T>) => {
  const key = JSON.parse(JSON.stringify(params));
  const fetcher = () => getAllAction<T>(params);
  return useSWR(key, fetcher);
};

export const useGetDoc = <T>(params: TDocParams) => {
  const key = JSON.parse(JSON.stringify(params));
  const fetcher = () => getByIdAction<T>(params.path, params.id);
  return useSWR(key, fetcher);
};

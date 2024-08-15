import { Document } from 'bson';
import { Filter, FindOptions } from 'mongodb';
import { SWRConfiguration } from 'swr';
import { TCollections } from '@/types/firestore';
import { TBaseEntity } from '@/types/base';

export type TUseSWRArgs<F extends (...args: any[]) => any, K extends keyof any> = (
  params?: Omit<Parameters<F>[0], K>,
  swrOptions?: Omit<SWRConfiguration, 'fetcher'>,
) => ReturnType<F>;

export type TCollectionParams = {
  path: TCollections;
};

export type TDocParams = TCollectionParams & {
  id: string;
};

export type TGetAllDocuments<T extends Document> = {
  path: TCollections;
  filter?: Filter<TBaseEntity> & Filter<T>;
  options?: FindOptions<TBaseEntity> & FindOptions<T>;
};

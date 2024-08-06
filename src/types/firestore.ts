import { FieldPath, OrderByDirection, WhereFilterOp } from '@firebase/firestore';

export type TQueryOrder<T> = {
  [key in keyof T]?: OrderByDirection;
};

export type TQueryFilter<T> = {
  fieldPath: keyof T | FieldPath;
  opStr: WhereFilterOp;
  value?: unknown;
};

export type TQueryOrderOption<T> = {
  order?: keyof T | TQueryOrder<T> | TQueryOrder<T>[];
};

export type TQueryOptionsWhere<T> = {
  where?: TQueryFilter<T> | TQueryFilter<T>[];
  or?: TQueryFilter<T> | TQueryFilter<T>[];
};

export type TQueryOptions<T> = TQueryOrderOption<T> & TQueryOptionsWhere<T>;

export type TCollections = 'posts' | 'medias' | 'categories' | 'leads' | 'translations';

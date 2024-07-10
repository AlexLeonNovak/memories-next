import {FieldPath, OrderByDirection, WhereFilterOp} from '@firebase/firestore';

export type TQueryOrder<T> = {
  [key in keyof T]?: OrderByDirection;
};

export type TQueryFilter<T> = {
  fieldPath: keyof T | FieldPath;
  opStr: WhereFilterOp;
  value?: unknown;
}

export type TQueryOptions<T extends object> = {
  order?: keyof T | TQueryOrder<T> | TQueryOrder<T>[];
  where?: TQueryFilter<T> | TQueryFilter<T>[];
  or?: TQueryFilter<T> | TQueryFilter<T>[];
}

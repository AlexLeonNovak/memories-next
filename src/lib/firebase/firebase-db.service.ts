import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  or,
  orderBy,
  OrderByDirection,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from '@firebase/firestore';
import { TBaseEntity, TCollections, TQueryFilter, TQueryOptions, TQueryOrder } from '@/types';
import 'server-only';

import { removeEmpty } from '../utils/object';
import { getFirebaseApp } from './index';

export const getFirestoreDatabase = () => {
  return getFirestore(getFirebaseApp());
};

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot<T & TBaseEntity>) => snap.data(),
});

export const getCollection = <T extends object>(path: TCollections) => {
  const database = getFirestoreDatabase();
  return collection(database, path).withConverter(converter<T>());
};

const getWhere = <T>(wh: TQueryFilter<T> | TQueryFilter<T>[]) =>
  [wh].flat().map(({ fieldPath, opStr, value }) => where(fieldPath as string, opStr, value));

export const createCRUD = <T extends object>(path: TCollections) => {
  const _collection = getCollection<T>(path);
  const getAll = async (queryOptions?: TQueryOptions<TBaseEntity & T>): Promise<Array<TBaseEntity & T>> => {
    try {
      const queryParams = [];
      if (queryOptions?.where || queryOptions?.or) {
        const andWhere = queryOptions.where ? getWhere(queryOptions.where) : [];
        const orWhere = queryOptions.or ? getWhere(queryOptions.or) : [];

        if (andWhere.length === 0) {
          if (orWhere.length === 1) {
            queryParams.push(orWhere[0]);
          } else if (orWhere.length > 1) {
            queryParams.push(or(...orWhere));
          }
        } else if (andWhere.length === 1) {
          if (orWhere.length === 0) {
            queryParams.push(andWhere[0]);
          } else if (orWhere.length === 1) {
            queryParams.push(or(andWhere[0], orWhere[0]));
          } else if (orWhere.length > 1) {
            queryParams.push(and(andWhere[0], or(...orWhere)));
          }
        } else if (andWhere.length > 1) {
          if (orWhere.length === 0) {
            queryParams.push(and(...andWhere));
          } else if (orWhere.length === 1) {
            queryParams.push(or(and(...andWhere), orWhere[0]));
          }
          // TODO: Check how to combine
          // else if (orWhere.length > 1) {
          //   queryParams.push(or(
          //     and(andWhere),
          //       or(...orWhere)
          //     )
          //   );
          // }
        }
      }
      if (queryOptions?.order) {
        const orders = [queryOptions.order].flat().map((value) => {
          if (typeof value === 'string') {
            return orderBy(value);
          } else {
            const [key, val] = Object.entries(value as TQueryOrder<T>)[0];
            return orderBy(key, val as OrderByDirection);
          }
        });
        queryParams.push(...orders);
      }

      // TODO: Try to fix it
      // @ts-ignore
      const q = queryParams.length ? query(_collection, ...queryParams) : _collection;
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TBaseEntity & T);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getById = async (id: string): Promise<(TBaseEntity & T) | undefined> => {
    try {
      const docRef = doc(_collection, id);
      const document = await getDoc(docRef);
      if (document.data()) {
        return { id: document.id, ...document.data() } as TBaseEntity & T;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const create = async (data: T): Promise<TBaseEntity & T> => {
    try {
      const document = await addDoc(_collection, {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return (await getById(document.id))!;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const update = async (id: string, data: Partial<T>): Promise<TBaseEntity & T> => {
    try {
      const docRef = doc(_collection, id);
      await setDoc(
        docRef,
        {
          ...removeEmpty(data),
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
      return (await getById(id))!;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteById = async (id: string): Promise<void> => {
    try {
      const docRef = doc(_collection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { getAll, getById, create, update, delete: deleteById, getCollection: () => _collection };
};

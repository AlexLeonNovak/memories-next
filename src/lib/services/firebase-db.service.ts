import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  QueryDocumentSnapshot,
  getDoc, doc,
} from '@firebase/firestore';
import {getFirebaseApp} from '.';
import {TBaseEntity, TCollections} from '@/types';


export const getFirestoreDatabase = () => {
  return getFirestore(getFirebaseApp());
}

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot<T & TBaseEntity>) => snap.data(),
})

export const getCollection = <T extends object>(path: TCollections) => {
    const database = getFirestoreDatabase();
    return collection(database, path).withConverter(converter<T>());
}

export const createCRUD = <T extends object>(path: TCollections) => {
  const _collection = getCollection<T>(path);
  const getAll = async (): Promise<Array<TBaseEntity & T>> => {
    try {
      const snapshot = await getDocs(_collection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TBaseEntity & T));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const getById = async (id: string): Promise<TBaseEntity & T> => {
    try {
      const docRef = doc(_collection, id);
      const document = await getDoc(docRef);
      return { id: document.id, ...document.data()! } as TBaseEntity & T;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const create = async (data: T): Promise<TBaseEntity & T> => {
    try {
      const document = await addDoc(_collection, {
        ...data,
        createdAt: new Date,
        updatedAt: new Date(),
      });
      return getById(document.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // const findOne = async (id: string): Promise<T> => {}

  return { getAll, getById, create };
}

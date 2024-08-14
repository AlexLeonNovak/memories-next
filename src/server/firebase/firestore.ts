import 'server-only';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseAdminApp } from '@/server/firebase/config';
import { TBaseEntity, TCollections } from '@/types';
import { removeEmpty } from '@/lib/utils';
import path from 'path';

export const firestoreAdmin = getFirestore(firebaseAdminApp);

export const createDocument = async <T>(path: TCollections, data: T): Promise<TBaseEntity & T> => {
  try {
    const collection = firestoreAdmin.collection(path);
    const docRef = await collection.add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const sn = await docRef.get();
    return { id: sn.id, ...sn.data() } as TBaseEntity & T;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateDocument = async <T>(path: TCollections, id: string, data: Partial<T>) => {
  try {
    const collection = firestoreAdmin.collection(path);
    await collection.doc(id).set(
      {
        ...removeEmpty(data),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
    const sn = await collection.doc(id).get();
    return { id: sn.id, ...sn.data() } as TBaseEntity & T;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteDocument = async (path: TCollections, id: string): Promise<void> => {
  try {
    const collection = firestoreAdmin.collection(path);
    await collection.doc(id).delete();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

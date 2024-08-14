import 'server-only';
import { TBaseEntity, TCollections, TGetAllDocuments } from '@/types';
import { removeEmpty } from '@/lib/utils';
import getMongoDB from '@/server/mongodb/config';
import { Filter, FindOptions, ObjectId, WithId } from 'mongodb';
import { Document } from 'bson';

const getCollection = async <T extends Document>(path: TCollections) => {
  const db = await getMongoDB();
  return db.db('memories').collection<T>(path);
};

export const getAllDocuments = async <T extends Document>({ path, filter, options }: TGetAllDocuments<T>) => {
  try {
    const collection = await getCollection<T>(path);
    const docs = await collection.find(filter ?? {}, options).toArray();
    return docs.map((doc) => {
      const { _id, ...rest } = doc;
      return { ...rest, id: _id.toString() } as unknown as TBaseEntity & T;
    });
  } catch (e) {
    console.error(path, e);
    throw e;
  }
};

export const getDocumentById = async <T>(path: TCollections, id: string): Promise<(TBaseEntity & T) | null> => {
  try {
    const collection = await getCollection(path);
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return null;
    }
    const { _id, ...rest } = doc;
    return { ...rest, id: _id.toString() } as TBaseEntity & T;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createDocument = async <T>(path: TCollections, data: T) => {
  try {
    const collection = await getCollection(path);
    const doc = await collection?.insertOne({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return (await getDocumentById<T>(path, doc.insertedId.toString()))!;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateDocument = async <T>(path: TCollections, id: string, data: Partial<T>) => {
  try {
    const collection = await getCollection(path);
    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...removeEmpty(data),
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true },
    );
    return (await getDocumentById<T>(path, id))!;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteDocument = async (path: TCollections, id: string): Promise<void> => {
  try {
    const collection = await getCollection(path);
    await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

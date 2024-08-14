'use server';

import { TCollections, TGetAllDocuments } from '@/types';
import { getAllDocuments, getDocumentById } from '@/server/mongodb';

export const getAllAction = async <T extends Document>(params: TGetAllDocuments<T>) => getAllDocuments<T>(params);

export const getByIdAction = async <T>(path: TCollections, id: string) => getDocumentById<T>(path, id);

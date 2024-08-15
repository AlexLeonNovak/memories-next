'use server';

import { getAllDocuments, getDocumentById } from '@/server/mongodb';
import { TCollections, TGetAllDocuments } from '@/types';

export const getAllAction = async <T extends Document>(params: TGetAllDocuments<T>) => getAllDocuments<T>(params);

export const getByIdAction = async <T>(path: TCollections, id: string) => getDocumentById<T>(path, id);

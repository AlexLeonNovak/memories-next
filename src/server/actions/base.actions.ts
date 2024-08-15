'use server';

import { revalidateTag } from 'next/cache';
import { unstable_serialize } from 'swr';
import { getAllDocuments, getDocumentById } from '@/server/mongodb';
import { TCollections, TGetAllDocuments } from '@/types';

export const getAllAction = async <T extends Document>(params: TGetAllDocuments<T>) => getAllDocuments<T>(params);

export const getByIdAction = async <T>(path: TCollections, id: string) => getDocumentById<T>(path, id);

export const revalidateAction = async (key: string) => revalidateTag(unstable_serialize(key));

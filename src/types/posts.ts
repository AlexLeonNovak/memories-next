import {TBaseEntity} from '.';

export enum EPostMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type TBaseFields = {
  name: string;
  isActive: boolean;
}

export type TPostMedia = {
  type: EPostMediaType,
  url: string,
}

export type TPost = TBaseFields & {
  description?: string;
  media: TPostMedia[];
  categories: string[];
}

export type TCategory = {
  name: string;
  isActive: boolean;
  order: number;
};

export type TPostEntity = TBaseEntity & TPost;
export type TCategoryEntity = TBaseEntity & TCategory;

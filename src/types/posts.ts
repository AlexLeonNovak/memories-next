import {TBaseEntity} from '.';


export type TBaseFields = {
  name: string;
  isActive: boolean;
}

export enum EMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type TMedia = {
  postId: string;
  mediaType: EMediaType,
  url: string,
  name: string,
  extension: string,
  type: string;
  lastModified: number;
  size: number;
}

export type TPost = TBaseFields & {
  description?: string;
  categories: string[];
}

export type TCategory = {
  name: string;
  isActive: boolean;
  order: number;
};

export type TPostEntity = TBaseEntity & TPost;
export type TCategoryEntity = TBaseEntity & TCategory;
export type TMediaEntity = TBaseEntity & TMedia;

export type TMediaWithPostEntity = TMediaEntity & {post: TPostEntity};
export type TPostWithMediaEntity = TPostEntity & {media: TMediaEntity[]};

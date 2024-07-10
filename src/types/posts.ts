export enum EPostMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type TBaseEntity = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

export type TPostMedia = {
  type: EPostMediaType,
  url: string,
}

export type TPost = {
  name: string;
  description?: string;
  media: TPostMedia[];
  categories: string[];
}

export type TCategory = {
  name: string;
  isEnabled: boolean;
}

export type TCollections = 'posts' | 'categories';

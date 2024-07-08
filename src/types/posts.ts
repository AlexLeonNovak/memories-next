export enum EPostMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type TBaseEntity = {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

export type TPost = {
  name: string;
  description?: string;
  mediaUrl: string;
  mediaType: EPostMediaType;
  categories: string[];
}

export type TCategory = {
  name: string;
  isEnabled: boolean;
}

export type TCollections = 'posts' | 'categories';

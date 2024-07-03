export enum EPostMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type TPost = {
  id?: string;
  name: string;
  description?: string;
  mediaUrl: string;
  mediaType: EPostMediaType;
  categories: string[];
}

export type TCategory = {
  id?: string;
  name: string;
  isEnabled: boolean;
}

export type TCollections = 'posts' | 'categories';

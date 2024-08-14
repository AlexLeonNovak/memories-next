export const SESSION_COOKIE_NAME = '_session';
export const SESSION_COOKIE_EXPIRES_IN = 60 * 60 * 2; // One day;

export const COLLECTION_PATH = {
  POSTS: 'posts',
  MEDIAS: 'medias',
  CATEGORIES: 'categories',
  LEADS: 'leads',
  TRANSLATIONS: 'translations',
} as const;

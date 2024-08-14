import { useGetDocs } from '@/hooks';
import { TGetAllDocuments, TTranslationEntity } from '@/types';

export const useGetTranslations = (params?: Omit<TGetAllDocuments<TTranslationEntity>, 'path'>) =>
  useGetDocs<TTranslationEntity>({ path: 'translations', ...params });

// export const useGetTranslations: TUseSWRArgs<typeof useGetDocs<TTranslationEntity>, 'path'> = (params, swrOptions) =>
//   useGetDocs<TTranslationEntity>({ path: COLLECTION_PATH.TRANSLATIONS, ...(params || {}) }, swrOptions);

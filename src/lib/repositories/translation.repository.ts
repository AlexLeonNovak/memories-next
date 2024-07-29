import { createCRUD } from '@/lib/services';
import { TTranslation } from '@/types';
// import { doc, query, where, groupBy } from '@firebase/firestore';

const crud = createCRUD<TTranslation>('translations');

// const getNamespaces = async (): Promise<string[]> => {
//   const collection = crud.getCollection();
//   const ref = doc(collection, 'namespace');
//   const q = query(collection, where('namespace', '!=', undefined));
//   console.log(ref);
//   return [];
// };
export const TranslationRepository = { ...crud };

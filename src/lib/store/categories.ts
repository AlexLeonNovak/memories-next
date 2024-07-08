import {create} from 'zustand';
import {TCategory, TPost} from '@/types';

type TCategoryState = {
  items: TCategory[];
  isLoading: boolean;
}
type TCategoryActions = {
  getAll: () => Promise<TCategory[]>;
  add: (item: TCategory) => Promise<void>;
  remove: (id: string) => Promise<void>;
}


export const useCategoryStore = create(set => ({

}))

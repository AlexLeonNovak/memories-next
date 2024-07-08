import {useQuery} from '@tanstack/react-query';
import {fetchCategories} from '@/server';

export const useCategories = () => {
  return useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
}

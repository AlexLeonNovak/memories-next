import {dehydrate, QueryClient} from '@tanstack/react-query';
import {fetchCategories} from '@/server';

export const categoriesListDehydrator = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    })
  return dehydrate(queryClient);
}

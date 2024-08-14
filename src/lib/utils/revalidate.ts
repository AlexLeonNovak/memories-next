import { revalidatePath } from 'next/cache';
import { locales } from '@/config';
import { ltrim } from '@/lib/utils/string';

export const revalidatePathLocales = (path: string) => {
  for (const locale of locales) {
    revalidatePath(`/${locale}/${ltrim(path, '/')}`);
  }
};

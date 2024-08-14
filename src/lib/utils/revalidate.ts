import { revalidatePath } from 'next/cache';
import { i18n } from '@/config';
import { ltrim } from '@/lib/utils/string';

export const revalidatePathLocales = (path: string) => {
  for (const locale of i18n.locales) {
    console.log(`/${locale}/${ltrim(path, '/')}`);
    revalidatePath(`/${locale}/${ltrim(path, '/')}`);
  }
};

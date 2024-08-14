import { z } from 'zod';
import { i18n, TLocale } from '@/config';

export const buildLocaleShape = (zod: z.ZodType) => {
  const localeShape = {} as { [key in TLocale]: z.ZodType };
  for (const locale of i18n.locales) {
    localeShape[locale] = zod;
  }
  return z.object(localeShape);
};

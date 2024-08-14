import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { locales, TLocale } from '@/config';

const localeShape = {} as { [key in TLocale]: any };
for (const locale of locales) {
  localeShape[locale] = zfd.text(z.string().optional()).default('');
}
export { localeShape };

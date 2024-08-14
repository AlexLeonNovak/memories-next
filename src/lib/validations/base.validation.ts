import { TBaseFields, TFormState } from '@/types';
import { ZodSchema, z } from 'zod';
import { zfd } from 'zod-form-data';
import { i18n, TLocale } from '@/config';

const localeShape = {} as { [key in TLocale]: any };
for (const locale of i18n.locales) {
  localeShape[locale] = zfd.text(z.string().optional()).default('');
}
export { localeShape };

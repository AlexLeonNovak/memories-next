import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { i18n, TLocale } from '@/config';

const localeShape = {} as { [key in TLocale]: any };
for (const locale of i18n.locales) {
  localeShape[locale] = zfd.text(z.string().optional()).default('');
}

export const updateTranslationSchemaServer = zfd.formData({
  id: zfd.text(),
  ...localeShape,
});

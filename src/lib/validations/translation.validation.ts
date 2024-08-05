import { zfd } from 'zod-form-data';
import { i18n, TLocale } from '@/i18n';
import { z } from 'zod';

const shape = {} as { [key in TLocale]: any };
for (const locale of i18n.locales) {
  shape[locale] = zfd.text(z.string().optional()).default('');
}
export const updateTranslationSchema = zfd.formData({
  id: zfd.text(),
  ...shape,
});

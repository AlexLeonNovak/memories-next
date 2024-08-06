import { zfd } from 'zod-form-data';
import { localeShape } from './base.validation';

export const updateTranslationSchema = zfd.formData({
  id: zfd.text(),
  ...localeShape,
});

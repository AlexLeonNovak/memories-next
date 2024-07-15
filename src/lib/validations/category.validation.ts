import {z} from 'zod';
import {TCategory} from '@/types';
import {zfd} from 'zod-form-data';
import {fetchCategories} from '@/server';

export const createCategorySchema = zfd.formData({
  name: zfd.text(z.string().min(1, 'Required')),
  isActive: z.coerce.boolean(),
})
  .refine(async ({ name }) => {
  const categories = await fetchCategories({
    where: {
      fieldPath: 'name',
      opStr: '==',
      value: name
    }
  });
  return !categories.length
}, 'Name is already in use');

// export const createCategorySchemaFD: z.ZodType<TCategory> = baseSchemaFD.extend({});

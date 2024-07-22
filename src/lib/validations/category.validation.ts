import {z} from 'zod';
import {TCategory} from '@/types';
import {zfd} from 'zod-form-data';
import {fetchCategories} from '@/server';

const baseCategorySchema = z.object({
  name: zfd.text(z.string().min(1, 'Required')),
  isActive: z.coerce.boolean(),
  order: zfd.numeric(),
});

export const createCategorySchema = zfd.formData(baseCategorySchema
  .refine(async ({name}) => {
      const categories = await fetchCategories({
        where: {
          fieldPath: 'name',
          opStr: '==',
          value: name,
        },
      });
      return !categories.length;
    },
    {
      message: 'Name is already in use',
      path: ['name'],
    })
);

export const updateCategorySchema = zfd.formData(baseCategorySchema.and(z.object({
  id: zfd.text(),
})));


// export const createCategorySchemaFD: z.ZodType<TCategory> = baseSchemaFD.extend({});

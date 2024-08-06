import { fetchCategories } from '@/server/actions/categories.actions';
import { TCategory } from '@/types';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { buildLocaleShape, localeShape } from './base.validation';

const baseCategorySchema = z.object({
  name: buildLocaleShape(zfd.text(z.string().optional()).default('')),
  isActive: z.coerce.boolean(),
  order: zfd.numeric(z.number().default(0)),
});

export const createCategorySchema = zfd.formData(baseCategorySchema);
export const createCategorySchemaServer = zfd.formData(
  baseCategorySchema.refine(
    async ({ name }) => {
      // TODO: fix validation
      console.log('Validation', name);
      // const categories = await fetchCategories({
      //   where: {
      //     fieldPath: 'name',
      //     opStr: '==',
      //     value: name,
      //   },
      // });
      return false;
      // return !categories.length;
    },
    {
      message: 'Name is already in use',
      path: ['name'],
    },
  ),
);

export const updateCategorySchema = zfd.formData(
  baseCategorySchema.and(
    z.object({
      id: zfd.text(),
    }),
  ),
);

// export const createCategorySchemaFD: z.ZodType<TCategory> = baseSchemaFD.extend({});

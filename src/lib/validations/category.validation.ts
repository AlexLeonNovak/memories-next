import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { buildLocaleShape } from '@/lib/utils';

const baseCategorySchema = z.object({
  name: buildLocaleShape(zfd.text(z.string().optional()).default('')),
  isActive: z.coerce.boolean(),
  order: zfd.numeric(z.number().default(0)),
});

export const createCategorySchema = zfd.formData(baseCategorySchema);

export const updateCategorySchema = zfd.formData(
  baseCategorySchema.and(
    z.object({
      id: zfd.text(),
    }),
  ),
);

// export const createCategorySchemaFD: z.ZodType<TCategory> = baseSchemaFD.extend({});

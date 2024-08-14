import { zfd } from 'zod-form-data';
import { i18n } from '@/config';
import { getCategories } from '@/server/swr';
import { z } from 'zod';
import { buildLocaleShape } from '@/lib/utils';

const baseCategorySchema = z.object({
  name: buildLocaleShape(zfd.text(z.string()).default('')),
  isActive: z.coerce.boolean(),
  order: zfd.numeric(z.number().default(0)),
});

export const createCategorySchemaServer = zfd.formData(
  baseCategorySchema.superRefine(async ({ name }, ctx) => {
    for (const locale of i18n.locales) {
      if (locale in name && name[locale]) {
        const { data } = await getCategories({ filter: { [`name.${locale}`]: name[locale] } });
        if (data.length) {
          ctx.addIssue({
            code: 'custom',
            path: ['name', locale as string],
            message: 'Name is already in use',
          });
        }
      }
    }
  }),
);

export const updateCategorySchemaServer = zfd.formData(
  baseCategorySchema.and(
    z.object({
      id: zfd.text(),
    }),
  ),
);

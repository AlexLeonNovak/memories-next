import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { buildLocaleShape } from '@/lib/utils';

const basePostSchema = z.object({
  name: buildLocaleShape(zfd.text(z.string().min(1, 'Required'))),
  description: buildLocaleShape(zfd.text(z.string().optional().default(''))),
  categories: zfd.repeatable(
    // z.preprocess(val => [val].flat(),
    z
      .array(zfd.text())

      // .array()
      .min(1, 'At least one category should be selected'),
    // )
  ),
  // media: zfd.repeatable(
  //   // z.preprocess(val => [val].flat(),
  //   z.array(zfd.text())
  //     .min(1)
  //   // )
  // ),
  isActive: z.coerce.boolean(),
});

export const createPostSchemaServer = zfd.formData(basePostSchema);

export const updatePostSchemaServer = zfd.formData(
  basePostSchema.and(
    z.object({
      id: zfd.text(),
    }),
  ),
);

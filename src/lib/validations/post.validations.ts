import {zfd} from 'zod-form-data';
import {z} from 'zod';
import {EPostMediaType, TPost} from '@/types';
import {Option} from '@/components';

export const categoriesOptionSchema: z.ZodSchema<Option> = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const createPostSchema = z.object({
  name: z.string()
    .min(1, 'Required')
    ,
  description: z.string().optional(),
  categories: z.array(categoriesOptionSchema).min(1),
  files: z
    .array(
      z.instanceof(File).refine(
        (file) => file.size < 10 * 1024 * 1024,
        'File size must be less than 10MB',
      ),
    )
    .min(1, 'At least one file must be selected')
    .max(5, 'Maximum 5 files are allowed')
  ,
  isActive: z.coerce.boolean(),
});

const basePostSchema = z.object({
  name: zfd.text(z.string().min(1, 'Required')),
  description: zfd.text(z.string().optional().default('')),
  categories: zfd.repeatable(
    // z.preprocess(val => [val].flat(),
      z.array(zfd.text())

      // .array()
      .min(1, 'At least one category should be selected')
    // )
  ),
  files: zfd.repeatable(
    // z.preprocess(val => [val].flat(),
      z.array(zfd.file(z.instanceof(File)))
      .min(1)
    // )
  ),
  isActive: z.coerce.boolean(),
});


export const createPostSchemaFD = zfd.formData(basePostSchema);

export const updatePostSchemaFD = zfd.formData(basePostSchema.and(z.object({
  id: zfd.text(),
})));

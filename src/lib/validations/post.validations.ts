import { Option } from '@/components';
import { getFileType } from '@/lib/utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const MAX_SIZE_IMAGE = Number(process.env.NEXT_PUBLIC_MAX_SIZE_IMAGE) || 10;
export const MAX_SIZE_VIDEO = Number(process.env.NEXT_PUBLIC_MAX_SIZE_VIDEO) || 100;

export const categoriesOptionSchema: z.ZodSchema<Option> = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const createPostSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  categories: z.array(categoriesOptionSchema).min(1),
  files: z
    .array(
      z.instanceof(File).superRefine((file, ctx) => {
        const type = getFileType(file);
        let message;
        if (type === 'image' && file.size > MAX_SIZE_IMAGE * 1024 * 1024) {
          message = `Image file size must be less than ${MAX_SIZE_IMAGE}MB`;
        }
        if (type === 'video' && file.size > MAX_SIZE_VIDEO * 1024 * 1024) {
          message = `Video file size must be less than ${MAX_SIZE_VIDEO}MB`;
        }
        if (message) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message,
            path: ['files'],
            fatal: true,
          });
        }
      }),
    )
    .min(1, 'At least one file must be selected')
    .max(5, 'Maximum 5 files are allowed'),
  isActive: z.coerce.boolean(),
});

const basePostSchema = z.object({
  name: zfd.text(z.string().min(1, 'Required')),
  description: zfd.text(z.string().optional().default('')),
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

export const createPostSchemaFD = zfd.formData(basePostSchema);

export const updatePostSchemaFD = zfd.formData(
  basePostSchema.and(
    z.object({
      id: zfd.text(),
    }),
  ),
);

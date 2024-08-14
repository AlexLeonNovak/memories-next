import { Option } from '@/components';
import { getFileType } from '@/lib/utils';
import { z } from 'zod';
import { buildLocaleShape } from '@/lib/utils';

export const MAX_SIZE_IMAGE = Number(process.env.NEXT_PUBLIC_MAX_SIZE_IMAGE) || 10;
export const MAX_SIZE_VIDEO = Number(process.env.NEXT_PUBLIC_MAX_SIZE_VIDEO) || 100;

export const categoriesOptionSchema: z.ZodSchema<Option> = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const createPostSchema = z.object({
  name: buildLocaleShape(z.string().min(1, 'Required')),
  description: buildLocaleShape(z.string().optional()),
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

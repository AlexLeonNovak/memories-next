import {z} from 'zod';
import {TCategory} from '@/types';
import {zfd} from 'zod-form-data';

export const createCategorySchema = zfd.formData({
  name: zfd.text(z.string().min(1, 'Required')),
  isActive: z.coerce.boolean(),
});

// export const createCategorySchemaFD: z.ZodType<TCategory> = baseSchemaFD.extend({});

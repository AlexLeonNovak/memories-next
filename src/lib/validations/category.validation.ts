import {z} from 'zod';
import {TCategory} from '@/types';

export const createCategorySchema: z.ZodType<TCategory> = z.object({
  name: z.string().min(1, 'Required'),
  isEnabled: z.coerce.boolean(),
})

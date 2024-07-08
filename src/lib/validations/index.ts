import {z, ZodSchema} from 'zod';
import {TFormState} from '@/types';

export * from './category.validation';

export const parseFormData = (schema: ZodSchema, fd: FormData): TFormState<z.infer<typeof schema>> => {
  const rawFD = Object.fromEntries(fd.entries());
  const parsed = schema.safeParse(rawFD);
  const { success, error, data } = parsed;
  return {
    success,
    data: data as z.infer<typeof schema>,
    errors: success ? [] : error?.issues.map(({path, message}) => ({
      path: path.join('.'),
      message,
    })),
  };
}

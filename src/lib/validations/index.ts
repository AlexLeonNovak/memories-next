import {z, ZodSchema} from 'zod';
import {TFormState} from '@/types';

export * from './category.validation';
export * from './post.validations';

export const parseFormData = <T extends ZodSchema>(schema: T, fd: FormData): TFormState<z.infer<typeof schema>> => {
  console.log(fd.getAll('files'));
  const parsed = schema.safeParse(fd);
  const { success, error, data } = parsed;
  return {
    success,
    data: data as z.infer<typeof schema>,
    errors: success ? [] : error?.issues.map(({path, message}) => ({
      path: path.join('.'),
      message,
    })),
  } as TFormState<z.infer<typeof schema>>;
}

import { z, ZodSchema } from 'zod';
import { TFormState } from '@/types';

export const parseSchemaFormData = async <T extends ZodSchema>(
  schema: T,
  fd: FormData | unknown,
): Promise<TFormState<z.infer<typeof schema>>> => {
  const parsed = await schema.safeParseAsync(fd);
  const { success, error, data } = parsed;
  if (success) {
    return { status: 'success', data };
  }

  return {
    status: 'error',
    errors: error.issues.map(({ path, message }) => ({
      path: path.join('.').toString(),
      message,
    })),
  };
};

import { TBaseFields, TFormState } from '@/types';
import { ZodSchema, z } from 'zod';
import { zfd } from 'zod-form-data';

export const baseSchema = z.object({
  name: z.string().min(1, 'Required'),
  isActive: z.coerce.boolean(),
}) satisfies z.ZodType<TBaseFields>;

export const baseSchemaWithId = z.object({
  id: z.string(),
});

export const baseSchemaFD = zfd.formData({
  name: zfd.text(),
  isActive: z.coerce.boolean(),
});

export const parseSchemaFormData = async <T extends ZodSchema>(
  schema: T,
  fd: FormData,
): Promise<TFormState<z.infer<typeof schema>>> => {
  const parsed = await schema.safeParseAsync(fd);
  const { success, error, data } = parsed;
  if (success) {
    return { status: 'success', data };
  }

  return {
    status: 'error',
    errors: error.issues.map(({ path, message }) => ({
      path: path[0].toString(),
      message,
    })),
  };
};

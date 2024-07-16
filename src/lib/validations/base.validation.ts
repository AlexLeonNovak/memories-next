import {z, ZodSchema} from 'zod';
import {TBaseFields, TFormState} from '@/types';
import {zfd} from 'zod-form-data';

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


export const parseSchemaFormData = async <T extends ZodSchema>(schema: T, fd: FormData): Promise<TFormState<z.infer<typeof schema>>> => {
  const parsed = await schema.safeParseAsync(fd);
  const { success, error, data } = parsed;
  return {
    success,
    data: data ? data as z.infer<typeof schema> : undefined,
    errors: success ? [] : error?.issues.map(({path, message}) => ({
      path: path[0],
      message,
    })),
  } as TFormState<z.infer<typeof schema>>;
};

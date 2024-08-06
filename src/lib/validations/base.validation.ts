import { TBaseFields, TFormState } from '@/types';
import { ZodSchema, z } from 'zod';
import { zfd } from 'zod-form-data';
import { i18n, TLocale } from '@/i18n';

const localeShape = {} as { [key in TLocale]: any };
for (const locale of i18n.locales) {
  localeShape[locale] = zfd.text(z.string().optional()).default('');
}
export { localeShape };

export const buildLocaleShape = (zod: z.ZodType) => {
  const localeShape = {} as { [key in TLocale]: z.ZodType };
  for (const locale of i18n.locales) {
    localeShape[locale] = zod;
  }
  return z.object(localeShape);
};

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

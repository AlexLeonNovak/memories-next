export const locales = ['uk', 'en'] as const;

export const i18n = {
  locales,
  defaultLocale: 'uk',
} as const;

export type TLocale = (typeof locales)[number];

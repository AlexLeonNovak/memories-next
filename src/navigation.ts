import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { i18n } from '@/config';
import { LocalePrefix } from 'next-intl/routing';

const { locales } = i18n;
export const localePrefix = 'as-needed' satisfies LocalePrefix;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});

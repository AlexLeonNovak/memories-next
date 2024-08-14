'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/navigation';
import { Button } from '@/components/ui';
import { Fragment, MouseEvent, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { locales } from '@/config';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  // const params = useParams<{ locale: string }>();
  const t = useTranslations('LanguageSwitcher');
  const currentLocale = useLocale();

  const onLanguageChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      // @ts-ignore
      router.replace(pathname, { locale: e.currentTarget.value });
    });
  };

  return (
    <div className='header-lang-switcher'>
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <Button
            variant='link'
            className={cn('px-0 uppercase', currentLocale === locale && 'underline')}
            disabled={currentLocale === locale || isPending}
            value={locale}
            onClick={onLanguageChange}
          >
            {t(locale)}
          </Button>
          {/* eslint-disable-next-line react/jsx-no-literals */}
          {index + 1 < locales.length && <span className='mx-[5px]'>/</span>}
        </Fragment>
      ))}
    </div>
  );
};

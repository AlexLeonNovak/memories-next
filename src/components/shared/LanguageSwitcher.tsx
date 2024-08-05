'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/navigation';
import { Button } from '@/components';
import { Fragment, MouseEvent, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { i18n } from '@/i18n';
import { useTranslations } from 'next-intl';

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const t = useTranslations('LanguageSwitcher');

  const onLanguageChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      // @ts-ignore
      router.replace(pathname, { locale: e.currentTarget.value });
    });
  };

  return (
    <div className='header-lang-switcher'>
      {i18n.locales.map((locale, index) => (
        <Fragment key={locale}>
          <Button
            variant='link'
            className={cn('px-0 uppercase', params.locale === locale && 'underline')}
            disabled={params.locale === locale || isPending}
            value={locale}
            onClick={onLanguageChange}
          >
            {t(locale)}
          </Button>
          {index + 1 < i18n.locales.length && <span className='mx-[5px]'>/</span>}
        </Fragment>
      ))}
    </div>
  );
};

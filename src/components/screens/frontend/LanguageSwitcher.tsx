'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { Button } from '@/components';
import { MouseEvent } from 'react';
import { cn } from '@/lib/utils';
// import { TLocale } from '@/i18n';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ lang: string }>();

  const onLanguageChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(e.currentTarget.value);
  };

  return (
    <div className='header-lang-switcher'>
      <Button
        variant='link'
        className={cn('px-0', params.lang === 'en' && 'underline')}
        value='en'
        onClick={onLanguageChange}
      >
        ENG
      </Button>
      <span className='mx-[5px]'>/</span>
      <Button
        variant='link'
        className={cn('px-0', params.lang === 'uk' && 'underline')}
        value='uk'
        onClick={onLanguageChange}
      >
        UA
      </Button>
    </div>
  );
};

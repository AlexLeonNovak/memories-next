'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui';

export default function NotFoundPage() {
  const t = useTranslations('Main404');

  return (
    <div className='h-[90vh] w-full flex items-center justify-center'>
      <div className='text-center '>
        <h1 className='text-white drop-shadow-[0_0_1.2px_rgba(0,0,0,1)] font-bold text-[42.618vw] leading-[42.618vw]  lg:text-[21.931vw] lg:leading-[21.931vw]'>
          {t('404')}
        </h1>
        <p className='text-[5.728vw] leading-[5.728vw] lg:text-[2.723vw] lg:leading-[2.723vw] uppercase mt-5'>
          {t('Page not found')}
        </p>
        <Button asChild className='uppercase mt-5'>
          <Link href='/'>{t('Go back Home')}</Link>
        </Button>
      </div>
    </div>
  );
}

'use client';

import { Button } from '@/components';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations('Admin');

  return (
    <div className='text-center space-y-5'>
      <h1 className='text-9xl'>{404}</h1>
      <p className='text-3xl'>{t('Page not found')}</p>
      <div>
        <Button
          variant='link'
          onClick={() => {
            router.back();
          }}
        >
          {t('Go back')}
        </Button>
      </div>
    </div>
  );
}

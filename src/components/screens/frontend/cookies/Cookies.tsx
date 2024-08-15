'use client';

import { useTranslations } from 'next-intl';

export const Cookies = () => {
  const t = useTranslations('Cookies');
  return (
    <section className='cookies'>
      <div className='wrapper' dangerouslySetInnerHTML={{ __html: t.raw('[html]content') }} />
    </section>
  );
};

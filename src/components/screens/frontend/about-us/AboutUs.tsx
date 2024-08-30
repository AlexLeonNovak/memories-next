'use client';

import { useTranslations } from 'next-intl';

export const AboutUs = () => {
  const t = useTranslations('AboutUs');
  return (
    <section className='about-us'>
      <div className='wrapper' dangerouslySetInnerHTML={{ __html: t.raw('[html]content') }} />
    </section>
  );
};

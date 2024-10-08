'use client';

import { useTranslations } from 'next-intl';

export const LegalTerms = () => {
  const t = useTranslations('LegalTerms');
  return (
    <section className='legal-terms'>
      <div className='wrapper' dangerouslySetInnerHTML={{ __html: t.raw('[html]content') }} />
    </section>
  );
};

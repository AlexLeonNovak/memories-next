'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import './css/footer.css';

export const Footer = () => {
  const t = useTranslations('MainFooter');
  return (
    <footer className='footer mt-auto'>
      <div className='footer-left'>{t('© {year} Zberezhemo', { year: new Date().getFullYear() })}</div>
      <div className='footer-right'>
        <Link href='/legal-terms'>{t('Legal terms and privacy')}</Link>
        <Link href='/cookies'>{t('Cookies')}</Link>
      </div>
    </footer>
  );
};

'use client';

import './css/footer.css';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('MainFooter');
  return (
    <footer className='footer'>
      <div className='footer-left'>{t('© {year} Zberezhemo', { year: new Date().getFullYear() })}</div>
      <div className='footer-right'>
        <Link href='/legal-terms'>{t('Legal terms and privacy')}</Link>
        <Link href='/'>{t('Cookies')}</Link>
      </div>
    </footer>
  );
};

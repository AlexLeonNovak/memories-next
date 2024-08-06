import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('Main404');

  return (
    <div>
      <h1 className='text-9xl'>{404}</h1>
      <p>{t('Page not found')}</p>
      <div>
        <Link href='/'>{t('Go back Home')}</Link>
      </div>
    </div>
  );
}

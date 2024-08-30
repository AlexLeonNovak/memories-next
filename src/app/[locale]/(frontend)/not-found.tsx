import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

export default async function NotFoundPage() {
  const t = await getTranslations('Main404');

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

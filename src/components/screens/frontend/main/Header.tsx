import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/shared';
import { Link } from '@/navigation';

import './css/header.css';

export const Header: React.FC = () => {
  const t = useTranslations('MainHeader');

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header-left">
          <Link href="/">
            <Image
              src="/logo.svg"
              className="header-logo"
              alt={t('logoAlt')} //'Zberezhemo logo'
              priority
              width={175}
              height={37}
            />
          </Link>
        </div>
        <div className="header-right">
          <LanguageSwitcher />
          <a href="#feedback" className="header-help">
            {t('I want to help')}
          </a>
        </div>
      </div>
    </header>
  );
};

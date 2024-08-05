import { Button, LanguageSwitcher } from '@/components';
import Image from 'next/image';
import './css/header.css';
import { Link } from '@/navigation';

export const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='wrapper'>
        <div className='header-left'>
          <Link href='/'>
            <Image src='/logo.svg' className='header-logo' alt='Zberezhemo logo' width={175} priority height={37} />
          </Link>
        </div>
        <div className='header-right'>
          <LanguageSwitcher />
          <a href='#feedback' className='header-help'>
            I want to help
          </a>
        </div>
      </div>
    </header>
  );
};

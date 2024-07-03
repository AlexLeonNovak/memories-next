import Image from 'next/image';
import {Button, LanguageSwitcher} from '@/components';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Image src="/logo.svg" alt="Zberezhemo logo" width={175} priority height={37}/>
      <LanguageSwitcher />
      <Button>I want to help</Button>
    </header>
  )
}

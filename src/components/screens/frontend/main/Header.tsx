import Image from 'next/image';
import {Button, LanguageSwitcher} from '@/components';
import "./css/header.css";

export const Header: React.FC = () => {
  return (
    <header className="header">
        <div className="wrapper">
            <div className="header-left">
                <Image src="/logo.svg" className="header-logo" alt="Zberezhemo logo" width={175} priority height={37}/>
            </div>
            <div className="header-right">
                <LanguageSwitcher />
                <a href="#feedback" className="header-help">I want to help</a>
            </div>
        </div>
    </header>
  )
}

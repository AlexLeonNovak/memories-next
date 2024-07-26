import { FC } from 'react';

export const LanguageSwitcher: FC = () => {
  return (
    <div className='header-lang-switcher'>
      <a href='#' className='header-lang-switcher__item header-lang-switcher__item_active'>
        ENG
      </a>
      <span className='header-lang-switcher__separator'>/</span>
      <a href='#' className='header-lang-switcher__item'>
        UA
      </a>
    </div>
  );
};

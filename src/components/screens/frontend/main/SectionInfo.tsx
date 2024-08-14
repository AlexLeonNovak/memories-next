'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import './css/info.css';

export const SectionInfo = () => {
  const t = useTranslations('MainInfo');

  return (
    <section className='info-section info'>
      <div className='wrapper'>
        <div className='info-main'>
          <div className='info-main__text' dangerouslySetInnerHTML={{ __html: t.raw('[html]text') }} />
          <div className='info-main__sponsors'>
            <a href='#' className='info-main__sponsors-item info-main__sponsors-item_logo'>
              <Image src='/ishr-iac-logo.svg' alt='ISHR Logo' width={106} height={45} />
            </a>
            <a href='#' className='info-main__sponsors-item info-main__sponsors-item_memory'>
              <Image src='/memory-box-logo.svg' alt='Memory Box Logo' width={184} height={18} />
            </a>
          </div>
          <Image className='info-main__image' src='/info.jpg' alt='Info' width={1300} height={655} />
        </div>
        <div className='info-footer' dangerouslySetInnerHTML={{ __html: t.raw('[html]footer') }} />
      </div>
    </section>
  );
};

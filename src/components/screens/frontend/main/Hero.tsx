'use client';

import React from 'react';
import './css/hero.css';
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutRight.css';
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('MainHero');

  return (
    <section className='hero'>
      <div className='wrapper'>
        <ScrollAnimation animateIn='fadeInDown'>
          <div className='hero__title'>{t('MEMORY')}</div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='fadeInDown'>
          <div className='hero__sub-title'>{t('LIBRARY')}</div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutRight'>
          <div className='hero__text'>{t('PEOPLE CITIES EVENTS')}</div>
        </ScrollAnimation>

        <Image
          src='/memory-bg.png'
          className='hero__bg'
          alt={t('bgImgAlt')} //'MEMORY LIBRARY PEOPLE. CITIES. EVENTS'
          width={160}
          height={288}
        />
      </div>
    </section>
  );
};

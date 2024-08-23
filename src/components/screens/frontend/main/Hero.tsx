'use client';

import { useGSAP } from '@gsap/react';
import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutRight.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { generateSymbolsFromText } from '@/lib/jsx-utils';
import { HeroBackAnimation } from './components/HeroBackAnimation';

export const Hero = () => {
  const t = useTranslations('MainHero');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }, []);

  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        '.hero__title .hero-text-letter',
        {
          'will-change': 'opacity',
          opacity: 0,
          filter: 'blur(5px)',
        },
        {
          duration: 1.75,
          ease: 'power1.inOut',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: { each: 0.1, from: 'random' },
        },
      );
      gsap.fromTo(
        '.hero__sub-title .hero-text-letter',
        {
          'will-change': 'opacity',
          opacity: 0,
          filter: 'blur(5px)',
        },
        {
          duration: 1.75,
          ease: 'power1.inOut',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: { each: 0.1, from: 'random' },
        },
      );
      gsap.fromTo(
        '.hero__text .hero-text-letter',
        {
          'will-change': 'opacity',
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          duration: 0.75,
          ease: 'power1.inOut',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: { each: 0.02, from: 'random' },
        },
      );
    },
    { scope: container },
  );

  const title = t('MEMORY');
  const subtitle = t('LIBRARY');
  const text = t('PEOPLE CITIES EVENTS');
  const className = 'hero-text-letter';

  const titleItems = generateSymbolsFromText(title, className);
  const subtitleItems = generateSymbolsFromText(subtitle, className);
  const textItems = generateSymbolsFromText(text, className);

  return (
    <section className='hero relative h-[106vw] lg:h-[90vh]'>
      <div className='flex h-full w-full items-center ' ref={container}>
        <HeroBackAnimation />
        <div className='w-full px-6 z-100 pointer-events-none relative'>
          <div className='hero__title text-[14.872vw] leading-[19.5vw] lg:text-[14.271vw] lg:leading-[18.552vw] font-medium lg:ml-[3.2vw] uppercase flex justify-start'>
            {titleItems}
          </div>
          <div className='hero__sub-title text-[14.872vw] leading-[19.5vw] lg:text-[14.271vw] lg:leading-[18.552vw] font-medium uppercase -mt-[6vw] lg:mr-[4.24vw] flex justify-end'>
            {subtitleItems}
          </div>
          <div className='hero__text text-[4.103vw] leading-[4.103vw] lg:text-[3.919vw] lg:leading-[3.919vw] font-normal uppercase -mt[1.8vw] mr-[12.1vw] flex justify-center'>
            {textItems}
          </div>
        </div>
      </div>
    </section>
  );
};

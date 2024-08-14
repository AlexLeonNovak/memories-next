'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { HeroBackAnimation } from './components/HeroBackAnimation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { generateSymbolsFromText } from '@/lib/jsx-utils';

import './css/hero.css';
import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutRight.css';

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
    <section className='hero'>
      <div className='wrapper' ref={container}>
        <HeroBackAnimation />
        <div className='hero-texts'>
          <div className='hero__title'>{titleItems}</div>
          <div className='hero__sub-title'>{subtitleItems}</div>
          <div className='hero__text'>{textItems}</div>
        </div>
      </div>
    </section>
  );
};

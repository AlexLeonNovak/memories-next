'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';

export const GalleryControlHelper = () => {
  const t = useTranslations('GalleryControlHelper');
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }, []);

  const container = React.useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to('.gallery-icon-help', {
        scale: 1.75,
        opacity: 0.7,
        duration: 0.9,
        stagger: {
          each: 0.5,
          repeat: -1,
        },
      });

      gsap.to('.gallery-icon-help', {
        autoAlpha: 0.0,
        duration: 0.9,
        delay: 2,
        scrollTrigger: {
          trigger: '.gallery-icon-help',
          start: 'top bottom',
          end: '+=500',
          // start: 'top',
          // end: 'top',
          // scrub: 1,
          // toggleActions: 'play resume resume reset',
          once: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div className='gallery-helper-container absolute top-0 left-0 right-0 z-100' ref={container}>
      <div className='gallery-helper'>
        <div className='galler-text-help'>{t('Click on item to read more')}</div>
        <div className='gallery-icon-help'>
          <Image width={50} height={50} src='/tap-white.svg' alt='Zberezhemo logo' priority className='gallery-icon' />
        </div>
      </div>
    </div>
  );
};

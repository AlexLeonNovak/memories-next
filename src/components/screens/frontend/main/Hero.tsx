'use client';

import React from 'react';
import './css/hero.css';
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.compat.css';

export const Hero = () => {
  return (
    <section className='hero'>
      <div className='wrapper'>
        <ScrollAnimation animateIn='fadeInDown'>
          <div className='hero__title'>MEMORY</div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='fadeInDown'>
          <div className='hero__sub-title'>LIBRARY</div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutRight'>
          <div className='hero__text'>PEOPLE. CITIES. EVENTS</div>
        </ScrollAnimation>

        <Image
          src='/memory-bg.png'
          className='hero__bg'
          alt='MEMORY LIBRARY PEOPLE. CITIES. EVENTS'
          width={160}
          height={288}
        />
      </div>
    </section>
  );
};

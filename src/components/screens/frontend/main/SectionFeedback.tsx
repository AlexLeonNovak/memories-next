'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FeedbackForm } from './components/FeedbackForm';
import { generateSymbolsFromText } from '@/lib/jsx-utils';

import 'animate.css/source/fading_entrances/fadeInDown.css';
import './css/feedback.css';

export const SectionFeedback = () => {
  const t = useTranslations('SectionFeedback');
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }, []);

  const container = React.useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      [
        '.feedback__line--one .feedback-letter',
        '.feedback__line--two .feedback-letter',
        '.feedback__line--three .feedback-letter',
      ].forEach((selector) => {
        gsap.fromTo(
          selector,
          {
            'will-change': 'opacity',
            opacity: 0,
            filter: 'blur(5px)',
          },
          {
            duration: 0.75,
            ease: 'power1.inOut',
            opacity: 1,
            filter: 'blur(0px)',
            stagger: { each: 0.025, from: 'random' },
            scrollTrigger: {
              trigger: '.feedback__title',
              start: 'top bottom',
              end: '+=500',
              scrub: 1,
              toggleActions: 'play resume resume reset',
            },
          },
        );
      });
    },
    { scope: container },
  );

  const lineOne = t('LET US SAVE');
  const lineTwo = t('THE PAST FOR');
  const lineThree = t('THE FUTURE');
  const className = 'feedback-letter';

  const lineOneItems = generateSymbolsFromText(lineOne, className);
  const lineTwoItems = generateSymbolsFromText(lineTwo, className);
  const lineThreeItems = generateSymbolsFromText(lineThree, className);

  return (
    <section id='feedback' className='feedback'>
      <div className='wrapper' ref={container}>
        <div className='feedback__text' dangerouslySetInnerHTML={{ __html: t.raw('[html]text') }} />
        <div className='feedback__title'>
          <div className='feedback__line feedback__line--one'>{lineOneItems}</div>
          <div className='feedback__line feedback__line--two'>{lineTwoItems}</div>
          <div className='feedback__line feedback__line--three'>{lineThreeItems}</div>
        </div>
        <FeedbackForm />
      </div>
    </section>
  );
};

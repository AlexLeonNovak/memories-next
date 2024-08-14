'use client';

import ScrollAnimation from 'react-animate-on-scroll';
import { useTranslations } from 'next-intl';

import { FeedbackForm } from './components/FeedbackForm';

import 'animate.css/source/fading_entrances/fadeInDown.css';
import './css/feedback.css';

export const SectionFeedback = () => {
  const t = useTranslations('MainFeedback');

  return (
    <section id='feedback' className='feedback'>
      <div className='wrapper'>
        <div className='feedback__text' dangerouslySetInnerHTML={{ __html: t.raw('[html]text') }} />
        <ScrollAnimation animateIn='fadeInDown'>
          <div className='feedback__title' dangerouslySetInnerHTML={{ __html: t.raw('[html]title') }} />
        </ScrollAnimation>
        <FeedbackForm />
      </div>
    </section>
  );
};

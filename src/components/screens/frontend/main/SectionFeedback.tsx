'use client';

import { FeedbackForm } from '@/components';
import './css/feedback.css';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/source/fading_entrances/fadeInDown.css';
import { useTranslations } from 'next-intl';

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

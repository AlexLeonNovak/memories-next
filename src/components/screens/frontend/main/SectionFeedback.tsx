'use client';

import { FeedbackForm } from '@/components';
import './css/feedback.css';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.compat.css';

export const SectionFeedback = () => {
  return (
    <section id='feedback' className='feedback'>
      <div className='wrapper'>
        <div className='feedback__text'>
          <i>
            “Family faces are magic mirrors. Looking at people who belong to us, we see the past, present, and future.”
          </i>{' '}
          Gail Lumet Buckley
        </div>
        <ScrollAnimation animateIn='fadeInDown'>
          <div className='feedback__title'>
            <span>LET’S SAVE</span>
            <span>THE PAST FOR</span>
            <span>THE FUTURE.</span>
          </div>
        </ScrollAnimation>
        <FeedbackForm />
      </div>
    </section>
  );
};

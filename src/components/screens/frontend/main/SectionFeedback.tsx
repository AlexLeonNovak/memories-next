'use client';

import React from 'react';
import { FeedbackForm } from '@/components';
import './css/feedback.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const SectionFeedback = () => {
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
                            end: 'center center',
                            toggleActions: 'play resume resume reset',
                        },
                    }
                );
            });
        },
        { scope: container }
    );

    console.log('test feedback');
    const getSymbolItems = (text: string, className: string) => {
        return text.split('').map((symbol, index) => {
            const value = symbol !== ' ' ? symbol : <div>&nbsp;</div>;
            return (
                <div key={index} className={className}>
                    {value}
                </div>
            );
        });
    };

    const lineOne = "LET'S SAVE";
    const lineTwo = 'THE PAST FOR';
    const lineThree = 'THE FUTURE.';
    const className = 'feedback-letter';

    const lineOneItems = getSymbolItems(lineOne, className);
    const lineTwoItems = getSymbolItems(lineTwo, className);
    const lineThreeItems = getSymbolItems(lineThree, className);

    return (
        <section id="feedback" className="feedback">
            <div className="wrapper" ref={container}>
                <div className="feedback__text">
                    <i>
                        “Family faces are magic mirrors. Looking at people who
                        belong to us, we see the past, present, and future.”
                    </i>{' '}
                    Gail Lumet Buckley
                </div>
                <div className="feedback__title">
                    <div className="feedback__line feedback__line--one">
                        {lineOneItems}
                    </div>
                    <div className="feedback__line feedback__line--two">
                        {lineTwoItems}
                    </div>
                    <div className="feedback__line feedback__line--three">
                        {lineThreeItems}
                    </div>
                </div>
                <FeedbackForm />
            </div>
        </section>
    );
};

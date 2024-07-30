'use client';

import React, { useRef } from 'react';
import './css/hero.css';
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.compat.css';
import { HeroBackAnimation } from './HeroBackAnimation';
import { BrowserView, isMobile } from 'react-device-detect';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const container = React.useRef<HTMLDivElement>(null);
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
                    // scrollTrigger: {
                    //     trigger: title,
                    //     start: 'top bottom',
                    //     end: 'center center',
                    //     toggleActions: "play resume resume reset"
                    // }
                }
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
                    // scrollTrigger: {
                    //     trigger: title,
                    //     start: 'top bottom',
                    //     end: 'center center',
                    //     toggleActions: "play resume resume reset"
                    // }
                }
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
                    // scrollTrigger: {
                    //     trigger: title,
                    //     start: 'top bottom',
                    //     end: 'center center',
                    //     toggleActions: "play resume resume reset"
                    // }
                }
            );
        },
        { scope: container }
    );

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

    const title = 'MEMORY';
    const subtitle = 'LIBRARY';
    const text = 'PEOPLE. CITIES. EVENTS.';
    const className = 'hero-text-letter';

    const titleItems = getSymbolItems(title, className);
    const subtitleItems = getSymbolItems(subtitle, className);
    const textItems = getSymbolItems(text, className);

    return (
        <section className="hero">
            <div className="wrapper" ref={container}>
                <HeroBackAnimation></HeroBackAnimation>
                <div className="hero-texts">
                    <div className="hero__title">{titleItems}</div>
                    <div className="hero__sub-title">{subtitleItems}</div>
                    <div className="hero__text">{textItems}</div>
                    {/* <ScrollAnimation animateIn="fadeInDown">
                        <div className="hero__title">MEMORY</div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInDown">
                        <div className="hero__sub-title">LIBRARY</div>
                    </ScrollAnimation> */}
                    {/* <ScrollAnimation
                        animateIn="fadeInDown"
                        animateOut="fadeOutRight"
                    >
                        <div className="hero__text">PEOPLE. CITIES. EVENTS</div>
                    </ScrollAnimation> */}
                </div>

                {/* <div className="hero__title">MEMORY</div>
                <div className="hero__sub-title">LIBRARY</div>
                <div className="hero__text">PEOPLE. CITIES. EVENTS.</div> */}
            </div>
        </section>
    );
};

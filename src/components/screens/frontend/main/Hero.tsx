'use client';

import React from 'react';
import './css/hero.css';
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.compat.css';
import { HeroBackAnimation } from './HeroBackAnimation';
import { BrowserView, isMobile } from 'react-device-detect';

export const Hero = () => {
    return (
        <section className="hero">
            <div className="wrapper">
                <HeroBackAnimation></HeroBackAnimation>
                <div className="hero-texts">
                    <ScrollAnimation animateIn="fadeInDown">
                        <div className="hero__title">MEMORY</div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInDown">
                        <div className="hero__sub-title">LIBRARY</div>
                    </ScrollAnimation>
                    <ScrollAnimation
                        animateIn="fadeInDown"
                        animateOut="fadeOutRight"
                    >
                        <div className="hero__text">PEOPLE. CITIES. EVENTS</div>
                    </ScrollAnimation>
                </div>
                {/* <div className="hero__title">MEMORY</div>
                <div className="hero__sub-title">LIBRARY</div>
                <div className="hero__text">PEOPLE. CITIES. EVENTS</div> */}
            </div>
        </section>
    );
};

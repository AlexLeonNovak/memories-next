'use client';

import React from 'react';
import './css/gallery.css';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const GalleryControlHelper = () => {
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
                delay: 5,
                scrollTrigger: {
                    trigger: '.galler-icon-help',
                    start: 'top',
                    end: 'bottom',
                    // scrub: 1,
                    toggleActions: 'play resume resume reset',
                    once: true
                },
            });
        },
        { scope: container }
    );

    return (
        <div className="gallery-helper-container" ref={container}>
            <div className="gallery-helper">
                <div className="galler-text-help">
                    Click on item to read more
                </div>
                <div className="gallery-icon-help">
                    <Image
                        width={50}
                        height={50}
                        src="/tap-white.svg"
                        alt="Zberezhemo logo"
                        priority
                        className="gallery-icon"
                    />
                </div>
            </div>
        </div>
    );
};

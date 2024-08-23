'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '@/hooks';

const NUMBER_OF_ROWS = 2;
const NUMBER_OF_CELLS = 7;
const ANIMATION_DURATION = 4000; //ms

export const HeroBackAnimation = () => {
  const { width } = useScreenSize();
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (width > 1024) {
      return;
    }
    if (!imgContainerRef.current) {
      return;
    }

    const heroImages = imgContainerRef.current.querySelectorAll('.hero_image');

    const interval = setInterval(() => {
      setCurrentIndex((prevIdx) => (prevIdx + 1) % heroImages.length);
    }, ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, [imgContainerRef, width]);

  useEffect(() => {
    if (width > 1024) {
      return;
    }

    if (!imgContainerRef.current) {
      return;
    }

    const heroImages = imgContainerRef.current.querySelectorAll('.hero_image');

    for (const heroImg of heroImages) {
      (heroImg as HTMLDivElement).style.opacity = '0';
    }

    (heroImages[currentIndex] as HTMLDivElement).style.opacity = '1';
  }, [width, currentIndex]);

  let animationDelay = 0;
  const rows = [];
  for (let rowCounter = 1; rowCounter <= NUMBER_OF_ROWS; rowCounter++) {
    const cells = [];
    for (let cellCounter = 1; cellCounter <= NUMBER_OF_CELLS; cellCounter++) {
      cells.push(
        <div
          key={`${rowCounter.toString()}_${cellCounter.toString()}`}
          className='hero_image w-full h-full bg-no-repeat bg-cover absolute top-0 lg:static opacity-0 lg:hover:opacity-80 transition-opacity ease-out duration-1000 lg:hover:ease-linear lg:delay-1000 lg:hover:delay-0 lg:hover:duration-500 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-stone-300/35 lg:after:content-none'
          style={{
            backgroundImage: `url('/hero-images/${rowCounter}_${cellCounter}.png')`,
            // animationDelay: `${animationDelay}s`,
          }}
        ></div>,
      );
      animationDelay += 4;
    }
    rows.push(
      <div key={rowCounter.toString()} className='h-full lg:flex lg:h-1/2 lg:justify-evenly'>
        {cells}
      </div>,
    );
  }

  return (
    <div
      className='absolute z-100 left-[calc(100%-25px)] -translate-x-full -top[10hv] w-[41vw] h-[74vw] lg:left-0 lg:translate-x-0 lg:w-full lg:h-full'
      ref={imgContainerRef}
    >
      {rows}
    </div>
  );
};

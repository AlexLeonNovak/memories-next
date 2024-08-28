'use client';

import { MapNavigation } from './components/map/MapNavigation';
import { RandomGallery } from './components/map/RandomGallery';
import { GalleryControlHelper } from './components/map/GalleryControlHelper';
import './css/map.css';
import { useDraggable } from 'react-use-draggable-scroll';
import { MutableRefObject, UIEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export const SectionMap = () => {
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(galleryContainerRef as MutableRefObject<HTMLDivElement>);
  const [scrollSide, setScrollSide] = useState<'left' | 'right' | null>(null);
  const [isScrollRightEnd, setIsScrollRightEnd] = useState(false);
  const [isScrollLeftEnd, setIsScrollLeftEnd] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { clientWidth, scrollWidth, scrollLeft } = e.currentTarget;
    setIsScrollLeftEnd(scrollLeft === 0);
    setIsScrollRightEnd(clientWidth === scrollWidth - scrollLeft);
  };

  useEffect(() => {
    if (!galleryContainerRef.current) {
      return;
    }
    if (!scrollSide) {
      intervalRef.current && clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        const step = scrollSide === 'right' ? 2 : -2;
        if (galleryContainerRef.current) {
          galleryContainerRef.current.scrollLeft += step;
        }
      }, 10);
    }
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [scrollSide, galleryContainerRef]);

  useEffect(() => {
    if (isScrollRightEnd || isScrollLeftEnd) {
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [isScrollRightEnd, isScrollLeftEnd]);

  return (
    <section className='map map-section w-full relative'>
      <MapNavigation />
      <GalleryControlHelper />
      <div
        className={cn(
          'w-20 absolute h-full top-0 right-0 z-50 hidden items-center justify-end bg-gradient-to-r from-transparent to-white',
          !isScrollRightEnd && 'lg:flex',
        )}
        onPointerEnter={() => setScrollSide('right')}
        onPointerLeave={() => setScrollSide(null)}
      >
        <ChevronsRight className='animate-bounce-right w-16 h-16 stroke-primary' />
      </div>
      <div
        className={cn(
          'w-20 absolute h-full top-0 left-0 z-50 hidden items-center justify-start bg-gradient-to-r from-white',
          !isScrollLeftEnd && 'lg:flex',
        )}
        onPointerEnter={() => setScrollSide('left')}
        onPointerLeave={() => setScrollSide(null)}
      >
        <ChevronsLeft className='animate-bounce-left w-16 h-16 stroke-primary' />
      </div>
      <div
        className='map__container map__container_temp py-20 overflow-x-auto overflow-y-hidden relative'
        {...events}
        ref={galleryContainerRef}
        onScroll={onScroll}
      >
        <div className='w-full min-w-[1000px] h-[870px] relative'>
          <RandomGallery />
        </div>
      </div>
    </section>
  );
};

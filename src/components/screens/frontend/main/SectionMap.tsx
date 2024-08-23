'use client';

import { MapNavigation } from './components/map/MapNavigation';
import { RandomGallery } from './components/map/RandomGallery';
import { GalleryControlHelper } from './components/map/GalleryControlHelper';
import './css/gallery.css';
import './css/map.css';

export const SectionMap = () => {
  return (
    <section className='map map-section w-full relative'>
      <MapNavigation />
      <GalleryControlHelper />
      <div className='map__container map__container_temp py-20 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden relative'>
        <div className='w-full min-w-[1000px] h-[870px] relative'>
          <RandomGallery />
        </div>
      </div>
    </section>
  );
};

'use client';

import {TPostMedia} from '@/types';
import Image from 'next/image';
import {AspectRatio, RandomGallery} from '@/components';

type TMapParallaxProps = {
  media: TPostMedia[];
}
export const MapParallax = ({media}: TMapParallaxProps) => {
  return (
    <div className="w-full h-[870px] relative">
      <RandomGallery media={media} />
      {/*{chunked.map((images, index) => (*/}
      {/*  <MouseParallax key={index} isAbsolutelyPositioned strength={(index + 1) * 0.15}>*/}
      {/*    <RandomGallery media={images} />*/}
      {/*  </MouseParallax>*/}
      {/*))}*/}
    </div>
  )
}

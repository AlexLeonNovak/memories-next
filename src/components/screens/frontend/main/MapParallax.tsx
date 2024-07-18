'use client';

import {MouseParallax} from 'react-just-parallax';
import {TPostMedia} from '@/types';
import Image from 'next/image';
import {AspectRatio, RandomGallery} from '@/components';

type TMapParallaxProps = {
  media: TPostMedia[];
}
export const MapParallax = ({media}: TMapParallaxProps) => {
  const chunked = [];
  const size = 5;
  for (let i = 0;  i < media.length; i += size) {
    chunked.push(media.slice(i, i + size))
  }

  return (
    <div className="w-full h-[870px] relative">
      {chunked.map((images, index) => (
        <MouseParallax key={index} isAbsolutelyPositioned strength={(index + 1) * 0.15}>
          <RandomGallery media={images} />
        </MouseParallax>
      ))}
    </div>
  )
}

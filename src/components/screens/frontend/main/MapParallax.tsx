'use client';

import {MouseParallax} from 'react-just-parallax';
import {TPostMedia} from '@/types';
import Image from 'next/image';
import {AspectRatio} from '@/components';

type TMapParallaxProps = {
  media?: TPostMedia[];
}
export const MapParallax = ({media}: TMapParallaxProps) => {
  return (
    <div className="w-full h-fit relative">
      <div className="flex flex-wrap gap-3">
      {media?.map(({ url, type }, index) => {
        if (type === 'image') {
          return (
            // <MouseParallax key={index}>
             <AspectRatio key={index} className="size-60 relative">
              <Image key={index}
                     src={url}
                     alt={url}
                     width={220}
                     height={0}
                     style={{ width: '100%', height: 'auto' }}
                     className="object-cover size-60"
              />
             </AspectRatio>
            // </MouseParallax>
          )
        }
      })}
      </div>
    </div>
  )
}

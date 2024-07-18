'use client';

import {ImgHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {TPostMedia} from '@/types';
import {createGallery, place} from '@/lib/utils';

type TRandomGalleryProps = {
  media: TPostMedia[];
}

export const RandomGallery = ({media}: TRandomGalleryProps) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    createGallery(containerRef.current);
    // for (const image of images) {
    //   place({
    //     image: images[2],
    //     containerWidth: containerRef.current.clientWidth || 0,
    //     containerHeight: containerRef.current.clientHeight || 0,
    //   })
    // }
  }, [containerRef])

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      {media.map(({ url, type }, index) => {
        if (type === 'image') {
          return <Image key={index}
                        src={url}
                        alt={url}
                        fill
                        className="absolute"
          />
        }
      })}

    </div>
  );
};

'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { MouseParallax } from 'react-just-parallax';
import { TMediaWithPostEntity } from '@/types';
import { cn, random } from '@/lib/utils';
import { useGalleryStore } from '@/lib/store';

type TGalleryItemProps = HTMLAttributes<HTMLDivElement> & {
  item: TMediaWithPostEntity;
  onItemClick?: (item: TMediaWithPostEntity) => void;
};
export const GalleryItem = ({ item, onItemClick, className, ...props }: TGalleryItemProps) => {
  const { hoveredCategories, setHoveredCategories, categorySelected } = useGalleryStore();
  return (
    <div className={cn('gallery-item z-10 hover:z-20', className)} {...props}>
      <MouseParallax
        isAbsolutelyPositioned
        strength={random(-0.3, -0.1)}
        lerpEase={random(0.01, 0.1)}
        enableOnTouchDevice
        zIndex={-1}
        shouldPause={false}
      >
        <div
          className={cn(
            'opacity-50 hover:opacity-100 ease-in-out duration-300 cursor-pointer',
            (hoveredCategories.some(cat => item.post.categories.includes(cat)) ||
              (categorySelected && item.post.categories.includes(categorySelected))) &&
              'opacity-100',
          )}
          onMouseEnter={() => setHoveredCategories(item.post.categories)}
          onMouseLeave={() => setHoveredCategories([])}
          onClick={() => onItemClick && onItemClick(item)}
        >
          {item.mediaType === 'image' && (
            <Image
              src={item.url}
              alt={item.url}
              fill
              className="object-contain hover:scale-125 ease-in-out duration-300"
            />
          )}
          {item.mediaType === 'video' && (
            <div className="relative hover:scale-125 ease-in-out duration-300">
              <video
                controls={false}
                preload="metadata"
                onMouseEnter={e => {
                  e.currentTarget.volume = 0;
                  e.currentTarget.play();
                }}
                onMouseLeave={e => e.currentTarget.pause()}
              >
                {/* eslint-disable-next-line react/jsx-no-literals */}
                <source src={item.url} />
                Your browser does not support the video tag.
              </video>
              <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-1/3 text-primary-foreground" />
            </div>
          )}
        </div>
      </MouseParallax>
    </div>
  );
};

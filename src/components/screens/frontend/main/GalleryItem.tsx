import {cn, random} from '@/lib/utils';
import {HTMLAttributes} from 'react';
import {TPostMedia} from '@/types';
import Image from 'next/image';
import { MouseParallax } from 'react-just-parallax';

type TGalleryItemProps = HTMLAttributes<HTMLDivElement> & {
  item: TPostMedia;
}
export const GalleryItem = ({item, className, ...props}: TGalleryItemProps) => {
  return (
    <div className={cn('gallery-item opacity-50 hover:opacity-100 z-10 hover:z-20 ease-in-out duration-300 cursor-pointer', className)} {...props}>
      <MouseParallax isAbsolutelyPositioned
                     strength={random(0.15, 0.3)}
                     lerpEase={random(0.01, 0.1)}
                     enableOnTouchDevice
                     zIndex={-1}
      >
      { item.type === 'image' &&
        <Image src={item.url}
               alt={item.url}
               fill
               className="object-cover hover:scale-125 ease-in-out duration-300"
        />
      }
      </MouseParallax>
    </div>
  )
}

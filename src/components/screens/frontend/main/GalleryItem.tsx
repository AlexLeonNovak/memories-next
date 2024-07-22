import {cn, random} from '@/lib/utils';
import {HTMLAttributes} from 'react';
import {TPostIdWMedia, TPostMedia} from '@/types';
import Image from 'next/image';
import {MouseParallax} from 'react-just-parallax';
import {useGalleryStore} from '@/lib/store';

type TGalleryItemProps = HTMLAttributes<HTMLDivElement> & {
  item: TPostIdWMedia;
  onItemClick?: (item: TPostIdWMedia) => void;
}
export const GalleryItem = ({item, onItemClick, className, ...props}: TGalleryItemProps) => {
  const {hoveredCategories, setHoveredCategories, categorySelected} = useGalleryStore();
  return (
    <div
      className={cn('gallery-item z-10 hover:z-20', className)}

      {...props}
    >
      <MouseParallax isAbsolutelyPositioned
                     strength={random(-0.3, -0.1)}
                     lerpEase={random(0.01, 0.1)}
                     enableOnTouchDevice
                     zIndex={-1}
                     shouldPause={false}
      >
        <div className={cn('opacity-50 hover:opacity-100 ease-in-out duration-300 cursor-pointer',
          (
            hoveredCategories.some(cat => item.categories.includes(cat)) ||
            (categorySelected && item.categories.includes(categorySelected))
          ) && 'opacity-100',
        )}
             onMouseEnter={() => setHoveredCategories(item.categories)}
             onMouseLeave={() => setHoveredCategories([])}
             onClick={() => onItemClick && onItemClick(item)}
        >
          {item.type === 'image' &&
						<Image src={item.url}
						       alt={item.url}
						       fill
						       className="object-cover hover:scale-125 ease-in-out duration-300"
						/>
          }
        </div>
      </MouseParallax>
    </div>
  );
};

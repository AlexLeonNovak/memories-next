'use client';

import {TPostWithMediaEntity} from '@/types';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components';
import Image from 'next/image';

type TModalContentProps = {
  post: TPostWithMediaEntity;
}
export const ModalContent = ({ post }: TModalContentProps) => {
  const { media, description, categories, name} = post;
  return (
    <div>
      <Carousel className="py-4 relative">
        <CarouselContent>
          {media.map(({ mediaType, url }, index) => (
            <CarouselItem key={index}
                          className="flex aspect-video relative"
            >
              { mediaType === 'image' && <Image src={url}
                                           alt={`${name} (${index})`}
                                           fill
                                           className="object-contain"
              /> }
              { mediaType === 'video' && <video controls preload='metadata'>
                <source src={url} />
	              Your browser does not support the video tag.
              </video> }
            </CarouselItem>
          )) }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p>{description}</p>
    </div>
  )
}

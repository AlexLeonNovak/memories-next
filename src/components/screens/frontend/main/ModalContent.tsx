'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components';
import { TPostWithMediaEntity } from '@/types';
import Image from 'next/image';
import { useLocale } from 'use-intl';
import { TLocale } from '@/i18n';

type TModalContentProps = {
  post: TPostWithMediaEntity;
};
export const ModalContent = ({ post }: TModalContentProps) => {
  const { media, description, categories, name } = post;
  const locale = useLocale() as TLocale;

  return (
    <div>
      <Carousel className='py-4 relative'>
        <CarouselContent>
          {media.map(({ mediaType, url }, index) => (
            <CarouselItem key={index} className='flex aspect-video relative'>
              {mediaType === 'image' && <Image src={url} alt={`${name} (${index})`} fill className='object-contain' />}
              {mediaType === 'video' && (
                <video controls preload='metadata'>
                  <source src={url} />
                  Your browser does not support the video tag.
                </video>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p>{description && description[locale]}</p>
    </div>
  );
};

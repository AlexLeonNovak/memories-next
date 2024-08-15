'use client';

import Image from 'next/image';
import { useLocale } from 'use-intl';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui';
import { TLocale } from '@/config';
import { useGetMedias } from '@/hooks';
import { TPostEntity } from '@/types';

type TModalContentProps = {
  post: TPostEntity;
};
export const ModalContent = ({ post }: TModalContentProps) => {
  const { description, name } = post;
  const { data: media } = useGetMedias({ filter: { postId: post.id } });
  const locale = useLocale() as TLocale;

  return (
    <div>
      <Carousel className="py-4 relative">
        <CarouselContent>
          {media?.map(({ mediaType, url }, index) => (
            <CarouselItem key={index} className="flex aspect-video relative">
              {mediaType === 'image' && <Image src={url} alt={`${name} (${index})`} fill className="object-contain" />}
              {mediaType === 'video' && (
                <video controls preload="metadata">
                  {/* eslint-disable-next-line react/jsx-no-literals */}
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

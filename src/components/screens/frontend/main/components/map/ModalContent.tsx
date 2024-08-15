'use client';

import Image from 'next/image';
import { useLocale } from 'use-intl';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui';
import { TLocale } from '@/config';
// import { useGetMedias } from '@/hooks';
import { TMediaWithPostEntity, TPostEntity } from '@/types';

type TModalContentProps = {
  media: TMediaWithPostEntity;
};
export const ModalContent = ({ media }: TModalContentProps) => {
  const {
    post: { description, name },
    mediaType,
    url,
  } = media;
  // const { data: media } = useGetMedias({ filter: { postId: post.id } });
  const locale = useLocale() as TLocale;

  return (
    <div className='max-w-full max-h-full'>
      {mediaType === 'image' && (
        <Image
          src={url}
          alt={`${name[locale]}`}
          width={0}
          height={0}
          style={{ maxWidth: '100%', width: '100%', maxHeight: '100%', height: 'auto' }}
          className='object-contain'
        />
      )}
      {mediaType === 'video' && (
        <video controls preload='metadata'>
          {/* eslint-disable-next-line react/jsx-no-literals */}
          <source src={url} />
          Your browser does not support the video tag.
        </video>
      )}
      {/*<Carousel className='py-4 relative'>*/}
      {/*  <CarouselContent>*/}
      {/*    {media?.map(({ mediaType, url }, index) => (*/}
      {/*      <CarouselItem key={index} className='flex aspect-video relative'>*/}
      {/*        {mediaType === 'image' && <Image src={url} alt={`${name} (${index})`} fill className='object-contain' />}*/}
      {/*        {mediaType === 'video' && (*/}
      {/*          <video controls preload='metadata'>*/}
      {/*            /!* eslint-disable-next-line react/jsx-no-literals *!/*/}
      {/*            <source src={url} />*/}
      {/*            Your browser does not support the video tag.*/}
      {/*          </video>*/}
      {/*        )}*/}
      {/*      </CarouselItem>*/}
      {/*    ))}*/}
      {/*  </CarouselContent>*/}
      {/*  <CarouselPrevious />*/}
      {/*  <CarouselNext />*/}
      {/*</Carousel>*/}
      {description && description[locale] && <p>{description[locale]}</p>}
    </div>
  );
};

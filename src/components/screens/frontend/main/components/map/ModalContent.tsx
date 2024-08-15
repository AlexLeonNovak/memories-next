'use client';

import { default as NextImage } from 'next/image';
import { useLocale } from 'use-intl';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui';
import { TLocale } from '@/config';
// import { useGetMedias } from '@/hooks';
import { TMediaWithPostEntity, TPostEntity } from '@/types';
import { AspectRatio } from '@/components/ui';
import { useEffect, useState } from 'react';

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
  const [ratio, setRatio] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (mediaType === 'image') {
      const img = new Image();
      img.onload = () => {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
        setRatio(
          img.naturalWidth > img.naturalHeight
            ? img.naturalWidth / img.naturalHeight
            : img.naturalHeight / img.naturalWidth,
        );
      };
      img.src = url;
    } else {
      setRatio(16 / 9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative'>
      {/*<AspectRatio className='' ratio={ratio}>*/}
      {mediaType === 'image' && ratio !== 0 && (
        // <div className='relative w-full h-full'>
        <NextImage
          src={url}
          alt={`${name[locale]}`}
          // sizes='80vw'
          width={imgWidth}
          height={imgHeight}
          // style={{ maxWidth: 'unset' }}
          className='object-contain'
        />
        // </div>
      )}
      {mediaType === 'video' && (
        <video controls preload='metadata'>
          {/* eslint-disable-next-line react/jsx-no-literals */}
          <source src={url} />
          Your browser does not support the video tag.
        </video>
      )}
      {/*</AspectRatio>*/}
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

'use client';

import { default as NextImage } from 'next/image';
import { useLocale } from 'use-intl';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { TLocale } from '@/config';
// import { useGetMedias } from '@/hooks';
import { TMediaWithPostEntity, TPostEntity } from '@/types';
import { AspectRatio } from '@/components/ui';
import { useScreenSize } from '@/hooks';

type TModalContentProps = {
  media: TMediaWithPostEntity;
  onWidthChange?: (width: number) => void;
};
export const ModalContent = ({ media, onWidthChange }: TModalContentProps) => {
  const {
    post: { description, name },
    mediaType,
    url,
  } = media;
  // const { data: media } = useGetMedias({ filter: { postId: post.id } });
  const locale = useLocale() as TLocale;

  const [isLoading, setIsLoading] = useState(true);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const { width, height } = useScreenSize();

  useEffect(() => {
    if (mediaType === 'image') {
      const img = new Image();
      img.onload = () => {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
      };
      img.src = url;
    } else {
      setIsLoading(false);
      // setRatio(16 / 9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!width || !height || !imgWidth || !imgHeight) {
      return;
    }

    if (imgHeight > height) {
      const _imgHeight = height * 0.7;
      const ratio = _imgHeight / imgHeight;
      const _imgWidth = imgWidth * ratio;
      setImgHeight(_imgHeight);
      setImgWidth(_imgWidth);
    }

    setIsLoading(false);
  }, [width, height, imgWidth, imgHeight]);

  useEffect(() => {
    onWidthChange && onWidthChange(imgWidth);
  }, [imgWidth, onWidthChange]);

  if (isLoading) {
    return <LoaderCircle className='flex m-auto animate-spin size-10' />;
  }

  return (
    <div>
      {/*<AspectRatio className='' ratio={ratio}>*/}
      {mediaType === 'image' && imgWidth !== 0 && imgHeight !== 0 && (
        <div className=''>
          <NextImage
            src={url}
            alt={`${name[locale]}`}
            // sizes='80vw'
            width={imgWidth}
            height={imgHeight}
            // style={{ maxWidth: 'unset' }}
            className='object-contain'
          />
        </div>
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

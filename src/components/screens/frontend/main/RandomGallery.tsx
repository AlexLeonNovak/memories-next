'use client';

import {useEffect, useRef, useState} from 'react';
import {MouseParallax} from 'react-just-parallax';
import {createGallery, TGalleryItemsWithLevel} from '@/lib/utils';
import {GalleryItem} from '@/components/screens/frontend/main/GalleryItem';

type TRandomGalleryProps = {
  media: any[];
}

export const RandomGallery = ({media}: TRandomGalleryProps) => {
  const [gallery, setGallery] = useState<TGalleryItemsWithLevel[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('useEffect call');
    if (!containerRef.current) return;
    const {itemsWithLevels} = createGallery(containerRef.current, media);
    setGallery(itemsWithLevels);
  }, []);

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      { gallery.length && gallery.map(({ level, placedItems }, index) =>
        placedItems.map(({ item, position}, i) => (
            <GalleryItem key={i} style={{...position}} className="absolute" item={item} />
        ))
      )}
      {/*{gallery?.length && gallery.map(({ element }) => (*/}
      {/*  <>{element}</>*/}
      {/*))}*/}
      {/*{[...Array(20).keys()].map((a, index) => {*/}
      {/*    return <GalleryItem key={index} style={{...randomSize()}} />;*/}
      {/*})}*/}

    </div>
  );
};

'use client';

import {useEffect, useRef, useState} from 'react';
import {createGallery, TGalleryItemsWithLevel} from '@/lib/utils';
import {TMediaWithPostEntity, TPostWithMediaEntity} from '@/types';
import {Modal, ModalContent, GalleryItem} from '@/components';
import {LoaderCircle} from 'lucide-react';
import {MediaRepository} from '@/lib/repositories';
import { GalleryControlHelper } from './GalleryControlHelper';

type TRandomGalleryProps = {
  medias: TMediaWithPostEntity[];
}

export const RandomGallery = ({medias}: TRandomGalleryProps) => {
  const [gallery, setGallery] = useState<TGalleryItemsWithLevel<TMediaWithPostEntity>[]>([]);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [post, setPost] = useState<TPostWithMediaEntity>();
  const containerRef = useRef<HTMLDivElement>(null);

  const onItemClick = async (item: TMediaWithPostEntity) => {
    setShowModalInfo(true);
    const media = await MediaRepository.getMedias(item.postId);
    setPost({ ...item.post, media });
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const {itemsWithLevels, unplacedItems} = createGallery(
      containerRef.current,
      medias,
      1
    );
    console.log('itemsWithLevels', itemsWithLevels);
    setGallery(itemsWithLevels);
  }, []);

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      { gallery.length > 0 && gallery.map(({ level, placedItems }, index) =>
        placedItems.map(({ item, position}, i) => (
            <GalleryItem key={`${i}_${item.id}`}
                         style={{...position}}
                         className="absolute"
                         item={item}
                         onItemClick={onItemClick}
            />
        ))
      )}
      <Modal open={showModalInfo}
                      setOpen={setShowModalInfo}
                      title={post?.name || 'Loading...'}
      >
        {post ? <ModalContent post={post} /> : <LoaderCircle className="animate-spin size-10" />}
      </Modal>
      <GalleryControlHelper></GalleryControlHelper>
    </div>
  );
};

'use client';

import { GalleryItem, Modal, ModalContent } from '@/components';
import { MediaRepository } from '@/lib/repositories';
import { TGalleryItemsWithLevel, createGallery } from '@/lib/utils';
import { TMediaWithPostEntity, TPostWithMediaEntity } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'use-intl';
import { TLocale } from '@/i18n';
import { useTranslations } from 'next-intl';
import { GalleryControlHelper } from './GalleryControlHelper';

type TRandomGalleryProps = {
  medias: TMediaWithPostEntity[];
};

export const RandomGallery = ({ medias }: TRandomGalleryProps) => {
  const locale = useLocale() as TLocale;
  const t = useTranslations('Main');

  const [gallery, setGallery] = useState<TGalleryItemsWithLevel<TMediaWithPostEntity>[]>([]);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [post, setPost] = useState<TPostWithMediaEntity>();
  const containerRef = useRef<HTMLDivElement>(null);

  const onItemClick = async (item: TMediaWithPostEntity) => {
    setShowModalInfo(true);
    const media = await MediaRepository.getMedias(item.postId);
    setPost({ ...item.post, media });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const { itemsWithLevels, unplacedItems } = createGallery(containerRef.current, medias, 1);
    setGallery(itemsWithLevels);
  }, [medias]);

  return (
    <div className='w-full h-full relative' ref={containerRef}>
      {gallery.length > 0 &&
        gallery.map(({ level, placedItems }, index) =>
          placedItems.map(({ item, position }, i) => (
            <GalleryItem
              key={`${i}_${item.id}`}
              style={{ ...position }}
              className='absolute'
              item={item}
              onItemClick={onItemClick}
            />
          )),
        )}
      <Modal open={showModalInfo} setOpen={setShowModalInfo} title={(post?.name && post.name[locale]) || t('Loading')}>
        {post ? <ModalContent post={post} /> : <LoaderCircle className='animate-spin size-10' />}
      </Modal>
      <GalleryControlHelper></GalleryControlHelper>
    </div>
  );
};

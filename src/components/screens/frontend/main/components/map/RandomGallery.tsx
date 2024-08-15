'use client';

import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'use-intl';

import { TMediaWithPostEntity, TPostEntity } from '@/types';
import { createGallery, TGalleryItemsWithLevel } from '@/lib/utils';
import { useGetMedias, useGetPosts } from '@/hooks';
import { TLocale } from '@/config';
import { Modal } from '@/components/shared/Modal';
import { GalleryControlHelper } from './GalleryControlHelper';
import { GalleryItem } from './GalleryItem';
import { ModalContent } from './ModalContent';

export const RandomGallery = () => {
  const { data: medias } = useGetMedias();
  const { data: posts } = useGetPosts();
  const locale = useLocale() as TLocale;
  const t = useTranslations('Main');

  const [gallery, setGallery] = useState<TGalleryItemsWithLevel<TMediaWithPostEntity>[]>([]);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [post, setPost] = useState<TPostEntity>();
  const containerRef = useRef<HTMLDivElement>(null);

  const onItemClick = async (item: TMediaWithPostEntity) => {
    setShowModalInfo(true);
    // const media = await MediaRepository.getMedias(item.postId);
    setPost(item.post);
  };

  useEffect(() => {
    if (!containerRef.current || !medias || !posts) {
      return;
    }
    const mediaWithPosts = medias.map(m => ({ ...m, post: posts.find(p => p.id === m.postId)! }));
    const { itemsWithLevels, unplacedItems } = createGallery(containerRef.current, mediaWithPosts, 1);
    setGallery(itemsWithLevels);
  }, [medias, posts]);

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      {gallery.length > 0 &&
        gallery.map(({ level, placedItems }, index) =>
          placedItems.map(({ item, position }, i) => (
            <GalleryItem
              key={`${i}_${item.id}`}
              style={{ ...position }}
              className="absolute"
              item={item}
              onItemClick={onItemClick}
            />
          )),
        )}
      <Modal open={showModalInfo} setOpen={setShowModalInfo} title={(post?.name && post.name[locale]) || t('Loading')}>
        {post ? <ModalContent post={post} /> : <LoaderCircle className="animate-spin size-10" />}
      </Modal>
      <GalleryControlHelper />
    </div>
  );
};

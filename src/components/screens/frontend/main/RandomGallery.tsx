'use client';

import {useEffect, useRef, useState} from 'react';
import {createGallery, TGalleryItemsWithLevel} from '@/lib/utils';
import {GalleryItem} from '@/components/screens/frontend/main/GalleryItem';
import {TPostEntity, TPostIdWMedia} from '@/types';
import {Modal, ModalContent} from '@/components';
import {Loader, LoaderCircle} from 'lucide-react';
import {fetchPostById} from '@/server';

type TRandomGalleryProps = {
  posts: TPostEntity[];
}

export const RandomGallery = ({posts}: TRandomGalleryProps) => {
  const [gallery, setGallery] = useState<TGalleryItemsWithLevel<TPostIdWMedia>[]>([]);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [postId, setPostId] = useState<string>();
  const [post, setPost] = useState<TPostEntity>();
  const containerRef = useRef<HTMLDivElement>(null);

  const onItemClick = async (item: TPostIdWMedia) => {
    setShowModalInfo(true);
    const post = await fetchPostById(item.id);
    setPost(post);
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const media = posts.map(
      ({media, id, categories}) =>
        media.map(m => ({ ...m, id, categories}))
    ).flat();
    const {itemsWithLevels, unplacedItems} = createGallery(
      containerRef.current,
      media,
      1
    );
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
    </div>
  );
};

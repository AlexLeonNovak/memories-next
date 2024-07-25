'use server';

import {cache} from 'react';
import {MediaRepository, PostRepository} from '@/lib/repositories';
import {TMediaEntity, TQueryOptions} from '@/types';

export const fetchMedias = (queryOptions?: TQueryOptions<TMediaEntity>) => MediaRepository.getAll(queryOptions);

export const fetchMediasWithActivePosts = async () => {
  const medias = await fetchMedias();
  const posts = await PostRepository.getAll();
  const activeMedias = [];
  for (const media of medias) {
    const post = posts.find(post => post.id === media.postId);
    if (post?.isActive) {
      activeMedias.push({...media, post});
    }
  }
  return activeMedias;
};

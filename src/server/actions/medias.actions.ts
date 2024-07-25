'use server';

import {cache} from 'react';
import {MediaRepository} from '@/lib/repositories';
import {fetchPosts} from '@/server';

export const fetchMedias = cache(MediaRepository.getAll);

export const fetchMediasWithActivePosts = cache(async () => {
  const medias = await fetchMedias();
  const posts = await fetchPosts();
  const activeMedias = [];
  for (const media of medias) {
    const post = posts.find(post => post.id === media.postId);
    if (post?.isActive) {
      activeMedias.push({...media, post});
    }
  }
  return activeMedias;
});

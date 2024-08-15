'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';
import { PageTitle, PostForm } from '@/components/screens';
import { TLocale } from '@/config';
import { TMediaEntity, TPostEntity } from '@/types';

type TPostFormWrapperProps = {
  post: TPostEntity;
  medias: TMediaEntity[];
  swrKey: string;
};

export const PostEditWrapper = ({ post, medias, swrKey }: TPostFormWrapperProps) => {
  const tAdm = useTranslations('Admin');
  const locale = useLocale() as TLocale;

  return (
    <div>
      <PageTitle title={tAdm(`Edit post: "{name}"`, { name: post.name[locale] })} />
      <PostForm post={post} swrKey={swrKey} medias={medias} />
    </div>
  );
};

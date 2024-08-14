'use client';

import { Button } from '@/components/ui';
import { useGalleryStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import { useLocale } from 'use-intl';
import { TLocale } from '@/config';
import { useGetCategories } from '@/hooks';

export const MapNavigation = () => {
  const { categorySelected, setCategorySelected } = useGalleryStore();
  const { data: categories } = useGetCategories({ filter: { isActive: true }, options: { sort: { order: 1 } } });
  const locale = useLocale() as TLocale;

  return (
    <div className='wrapper'>
      <div className='map__navigation'>
        {categories?.map(({ id, name }, index) => (
          <Fragment key={id}>
            {/* eslint-disable-next-line react/jsx-no-literals */}
            {index > 0 && <span className='text-xl map__navigation-separator'>/</span>}
            <Button
              key={id}
              variant='link'
              type='button'
              className={cn('uppercase text-xl font-normal px-1', categorySelected === id && 'underline')}
              onClick={() => setCategorySelected(categorySelected === id ? null : id)}
            >
              {name[locale]}
            </Button>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

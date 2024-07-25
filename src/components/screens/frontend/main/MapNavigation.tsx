'use client';

import {Button} from '@/components';
import {cn} from '@/lib/utils';
import {TCategoryEntity} from '@/types';
import {useGalleryStore} from '@/lib/store';


type TMapNavigationProps = {
  categories: TCategoryEntity[];
}
export const MapNavigation = ({categories}: TMapNavigationProps) => {
  const { categorySelected, setCategorySelected } = useGalleryStore();

  return (
    <div className="wrapper">
      <div className="map__navigation">
        {/*<Button variant='link'*/}
        {/*        className={cn('uppercase text-xl font-normal px-1', 'underline')}*/}
        {/*>All</Button>*/}
        {categories.length > 0 && categories.map(({id, name, isActive}, index) => {
            if (isActive) {
              return (
                <>
                  {index > 0 && <span className="text-xl map__navigation-separator">/</span>}
                  <Button key={id}
                          variant='link'
                          type='button'
                          className={cn('uppercase text-xl font-normal px-1', categorySelected === id && 'underline')}
                          onClick={() => setCategorySelected(categorySelected === id ? null : id)}
                  >
                    {name}
                  </Button>
                </>
              )
            }
          }
        )}
      </div>
    </div>
  )
}
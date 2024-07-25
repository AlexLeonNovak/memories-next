import {fetchCategories, fetchMediasWithActivePosts} from '@/server';
import {Button, MapNavigation, RandomGallery} from '@/components';
import './css/map.css';
import {cn} from '@/lib/utils';

export const SectionMap = async () => {
  const medias = await fetchMediasWithActivePosts();
  const categories = await fetchCategories({
    order: {'order': 'asc'},
  })
  return (
    <section className="map map-section w-full">
      <MapNavigation categories={categories}/>
      <div className="map__container map__container_temp py-8 overflow-x-scroll overflow-y-hidden lg:overflow-x-hidden">
        <div className="w-full min-w-[800px] h-[870px] relative">
          <RandomGallery medias={medias}/>
        </div>
      </div>
    </section>
  );
};

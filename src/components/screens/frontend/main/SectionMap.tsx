import {MapNavigation, RandomGallery} from '@/components';
import './css/map.css';
import {fetchMediasWithActivePosts} from '@/server/actions/medias.actions';
import {fetchCategories} from '@/server/actions/categories.actions';

export const SectionMap = async () => {
  const medias = await fetchMediasWithActivePosts();
  const categories = await fetchCategories({
    order: {'order': 'asc'},
  })
  return (
    <section className="map map-section w-full">
      <MapNavigation categories={categories}/>
      <div className="map__container map__container_temp py-8 overflow-x-clip overflow-y-hidden lg:overflow-x-hidden">
        <div className="w-full min-w-[800px] h-[870px] relative">
          <RandomGallery medias={medias}/>
        </div>
      </div>
    </section>
  );
};

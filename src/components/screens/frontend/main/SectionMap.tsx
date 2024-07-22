import {fetchCategories, fetchPosts} from '@/server';
import {Button, MapNavigation, RandomGallery} from '@/components';
import './css/map.css';
import {cn} from '@/lib/utils';

export const SectionMap = async () => {
  const posts = await fetchPosts();
  const categories = await fetchCategories({
    // order: {'order': 'asc'},
  })
  return (
    <section className="map map-section w-full">
      <MapNavigation categories={categories}/>
      <div className="map__container map__container_temp py-8">
        <div className="w-full h-[870px] relative">
          <RandomGallery posts={posts}/>
        </div>
      </div>
    </section>
  );
};

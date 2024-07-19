import {fetchPostsWithCategories} from '@/server';
import {MapParallax} from '@/components';
import './css/map.css';

export const SectionMap = async () => {
  const posts = await fetchPostsWithCategories();
  const media = posts.map(({media}) => media).flat();
  return (
    <section className="map map-section w-full">
      <div className="wrapper">
        <div className="map__navigation">
          <a href="#" className="map__navigation-item map__navigation-item_active">PEOPLE</a>
          <span className="map__navigation-separator">/</span>
          <a href="#" className="map__navigation-item">CITIES</a>
          <span className="map__navigation-separator">/</span>
          <a href="#" className="map__navigation-item">EVENTS</a>
        </div>
      </div>
      <div className="map__container map__container_temp">
        <MapParallax media={media}/>
      </div>
    </section>
  );
};

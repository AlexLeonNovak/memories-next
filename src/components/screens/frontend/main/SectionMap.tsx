import {fetchPostsWithCategories} from '@/server';
import {MapParallax} from '@/components';

export const SectionMap = async () => {
  const posts = await fetchPostsWithCategories();
  const media = posts.map(({ media }) => media).flat();
  return (
    <section className="map-section w-full">
      <MapParallax media={media} />
    </section>
  )
}

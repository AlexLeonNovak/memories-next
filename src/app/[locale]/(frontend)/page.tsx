import { Hero, SectionFeedback, SectionInfo, SectionMap } from '@/components/screens';

export default async function Home() {
  return (
    <>
      <Hero />
      <SectionInfo />
      {/*<SectionMap />*/}
      <SectionFeedback />
    </>
  );
}

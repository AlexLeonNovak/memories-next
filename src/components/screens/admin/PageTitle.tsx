'use client';

type TPageTitleProps = {
  title: string;
  description?: string;
};

// export function generateMetadata({ title, description }: TPageTitleProps) {
//   return { title, description };
// }

export const PageTitle = ({ title }: TPageTitleProps) => (
  <>
    <h1 className="text-3xl">{title}</h1>
  </>
);

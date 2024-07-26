import Head from 'next/head';

type TPageTitleProps = {
  title: string;
  description?: string;
};
export const PageTitle = ({ title, description }: TPageTitleProps) => (
  <>
    <Head>
      <title>{title}</title>
      {description && <meta name='description' content={description} key='desc' />}
    </Head>
    <h1 className='text-3xl'>{title}</h1>
  </>
);

import type { Metadata } from 'next';
import { Footer, Header } from '@/components';
import { TChildrenProps, TAppLayoutProps } from '@/types';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({ params: { locale } }: TAppLayoutProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default async function RootLayout({ children }: TChildrenProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

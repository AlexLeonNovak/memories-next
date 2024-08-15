import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Footer, Header } from '@/components/screens';
import { TAppLayoutProps, TChildrenProps } from '@/types';

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

import type { Metadata } from 'next';
import { Footer, Header } from '@/components';
import { TChildrenProps, TLocaleProps } from '@/types';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({ params: { locale } }: TLocaleProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title', { defaultMessage: 'Zberezhemo' }),
    description:
      'The project exists with the support of donors, and we invite funds, organizations, and caring patrons to join us.',
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

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalTerms } from '@/components/screens';
import { TAppLayoutProps } from '@/types';

export const generateMetadata = async ({ params: { locale } }: TAppLayoutProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'LegalTermsMetadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
};
export default function PageLegalTerms() {
  return (
    <>
      <LegalTerms />
    </>
  );
}

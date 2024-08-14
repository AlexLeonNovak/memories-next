import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Toaster } from 'sonner';
import { TChildrenProps, TAppLayoutProps } from '@/types';
import { locales, TLocale } from '@/config';
import './globals.css';
import { IntlProvider, SWRProvider } from '@/providers';
import { getCategories, getMedias, getPosts, getTranslations } from '@/server/swr';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type TRootLayoutProps = TChildrenProps & TAppLayoutProps;

export default async function RootLayout({ children, params }: TRootLayoutProps) {
  unstable_setRequestLocale(params.locale);

  const posts = await getPosts();
  const categories = await getCategories();
  const medias = await getMedias();
  const translations = await getTranslations();

  const fallback = {
    [posts.key]: posts.data,
    [categories.key]: categories.data,
    [medias.key]: medias.data,
    [translations.key]: translations.data,
  };

  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <SWRProvider fallback={fallback}>
          <IntlProvider locale={params.locale} messages={messages}>
            {children}
          </IntlProvider>
        </SWRProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

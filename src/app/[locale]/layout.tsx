import type { Metadata } from 'next';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { locales } from '@/config';
import { IntlProvider, SWRProvider } from '@/providers';
import { getCategories, getMedias, getPosts, getTranslations } from '@/server/swr';
import { TAppLayoutProps, TChildrenProps } from '@/types';

import './globals.css';
import { cn } from '@/lib/utils';

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
      <body className={cn('flex flex-col min-h-screen h-auto', inter.className)}>
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

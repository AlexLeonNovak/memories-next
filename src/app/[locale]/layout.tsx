import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Toaster } from 'sonner';
import { TChildrenProps, TLocaleProps } from '@/types';
import { i18n, TLocale } from '@/i18n';
import './globals.css';
import Intl from './Intl';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: TChildrenProps & TLocaleProps) {
  unstable_setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        {/*<NextIntlClientProvider locale={params.locale} messages={messages}>*/}
        {/*  {children}*/}
        {/*  <Toaster richColors />*/}
        {/*</NextIntlClientProvider>*/}
        <Intl locale={params.locale} messages={messages}>
          {children}
        </Intl>
        <Toaster richColors />
      </body>
    </html>
  );
}

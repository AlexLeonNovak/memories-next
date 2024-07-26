import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zberezhemo',
  description:
    'The project exists with the support of donors, and we invite funds, organizations, and caring patrons to join us.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head />
      <body className={inter.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

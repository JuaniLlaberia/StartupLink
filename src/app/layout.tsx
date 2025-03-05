import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import ReactQueryProvider from '@/components/custom/react-query-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'StartupLink',
  description:
    'Discover startups, find the right co-founders and team members, and turn your vision into a thriving business.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>
        <NextTopLoader showSpinner={false} color='#8E51FF' />
        <Toaster richColors theme='light' />
        <ThemeProvider
          attribute='class'
          enableSystem
          disableTransitionOnChange
          defaultTheme='light'
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

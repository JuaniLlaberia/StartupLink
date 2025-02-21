import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
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
        <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
          <main className='p-4 px-4 md:px-16 lg:px-24 xl:px-36'>
            <ReactQueryProvider>
              <Navbar />
              <div className='min-h-[calc(100dvh-7rem)]'>{children}</div>
              <Footer />
            </ReactQueryProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

import Footer from '@/components/custom/footer';
import Navbar from '@/components/custom/navbar';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <main className='p-4 px-4 md:px-16 lg:px-24 xl:px-36'>
        <Navbar />
        <div className='min-h-[calc(100dvh-7rem)]'>{children}</div>
        <Footer />
      </main>
    </SessionProvider>
  );
};

export default MainLayout;

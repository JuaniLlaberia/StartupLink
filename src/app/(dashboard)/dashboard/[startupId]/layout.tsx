import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import DashboardNavbar from './(components)/dashboard-navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './(components)/dashboard-sidebar';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <main className='w-full'>
        <DashboardNavbar />
        <div className='p-4'>{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

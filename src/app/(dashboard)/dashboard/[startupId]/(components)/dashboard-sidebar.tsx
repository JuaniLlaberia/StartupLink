import Link from 'next/link';
import { LogOut } from 'lucide-react';

import DashboardSidebarMain from './dashboard-sidebar-main';
import Logo from '@/components/custom/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar';

export function DashboardSidebar() {
  return (
    <Sidebar variant='sidebar' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          className='flex items-center justify-center hover:bg-transparent h-auto'
        >
          <Logo size='sm' />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <DashboardSidebarMain />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          variant='outline'
          size='sm'
          asChild
          className='flex items-center justify-center hover:bg-transparent h-auto'
        >
          <Link href='/my-startups'>
            <LogOut className='size-4' />
            <span className='group-data-[collapsible=icon]:hidden'>
              Leave dashboard
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

'use client';

import Link from 'next/link';
import {
  Calendar1,
  FileUser,
  LayoutPanelLeft,
  List,
  Palette,
  Settings,
  Tag,
  Users,
} from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const MAIN_SIDEBAR_LINKS = [
  {
    label: 'Information',
    url: 'information',
    icon: LayoutPanelLeft,
  },
  {
    label: 'Page design',
    url: 'design',
    icon: Palette,
  },
  {
    label: 'Roles',
    url: 'roles',
    icon: Tag,
  },
  {
    label: 'Applications',
    url: 'applications',
    icon: FileUser,
  },
  {
    label: 'Members',
    url: 'members',
    icon: Users,
  },
];

const EXTRA_SIDEBAR_LINKS = [
  {
    label: 'Surveys',
    url: 'surveys',
    icon: List,
    new: true,
  },
  {
    label: 'Events',
    url: 'events',
    icon: Calendar1,
    new: true,
  },
  {
    label: 'Settings',
    url: 'settings',
    icon: Settings,
    new: false,
  },
];

const DashboardSidebarMain = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarMenu className='px-1'>
          {MAIN_SIDEBAR_LINKS.map(({ label, url, icon: Icon }) => (
            <SidebarMenuItem key={url}>
              <SidebarMenuButton asChild isActive={pathname.includes(url)}>
                <Link href={url}>
                  <Icon className='size-4 shrink-0' />
                  <span className='group-data-[collapsible=icon]:hidden'>
                    {label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Extra</SidebarGroupLabel>
        <SidebarMenu className='px-1'>
          {EXTRA_SIDEBAR_LINKS.map(
            ({ label, url, icon: Icon, new: newFeature }) => (
              <SidebarMenuItem key={url}>
                <SidebarMenuButton asChild isActive={pathname.includes(url)}>
                  <Link href={url}>
                    <Icon className='size-4 shrink-0' />
                    <span className='group-data-[collapsible=icon]:hidden'>
                      {label}
                    </span>
                  </Link>
                </SidebarMenuButton>
                {newFeature && (
                  <SidebarMenuBadge>
                    <Badge className='bg-violet-200/60 text-violet-500 text-[10px] py-0.5 px-1.5'>
                      New
                    </Badge>
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default DashboardSidebarMain;

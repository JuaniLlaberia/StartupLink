import NotificationsMenu from '@/components/custom/notifications-menu';
import UserMenu from '@/components/custom/user-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

const DashboardNavbar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-background w-full flex items-center justify-between gap-4 p-2'>
      <SidebarTrigger />
      <div className='flex items-center gap-2.5'>
        <NotificationsMenu />
        <UserMenu />
      </div>
    </nav>
  );
};

export default DashboardNavbar;

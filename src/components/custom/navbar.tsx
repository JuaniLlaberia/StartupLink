'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';

import Logo from './logo';
import AuthDialog from '../auth/auth-dialog';
import UserMenu from './user-menu';
import SearchDialog from './search-dialog';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button, buttonVariants } from '../ui/button';

const LINKS = [
  {
    label: 'Startups',
    url: '/startups',
  },
  {
    label: 'People',
    url: '/people',
  },
  {
    label: 'Forum',
    url: '/forum',
  },
  {
    label: 'Events',
    url: '/events',
  },
];

const Navbar = () => {
  const { status } = useSession();

  return (
    <nav className='flex items-center justify-between p-1'>
      <div className='flex items-center gap-2 md:gap-8'>
        <Logo />
        {/* Mobile navigation */}
        <Drawer>
          <DrawerTrigger asChild className='md:hidden'>
            <Button size='icon' variant='ghost'>
              <Menu className='size-6' />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className='hidden'>
              <DrawerTitle />
              <DrawerDescription />
            </DrawerHeader>
            <ul className='space-y-2.5 p-4'>
              {LINKS.map(({ url, label }) => (
                <li key={url}>
                  <DrawerClose asChild>
                    <Link
                      href={url}
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'lg' }),
                        'font-medium w-full justify-start text-base'
                      )}
                    >
                      {label}
                    </Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
          </DrawerContent>
        </Drawer>
        {/* Desktop navigation */}
        <ul className='hidden md:flex gap-2'>
          {LINKS.map(({ url, label }) => (
            <li key={url}>
              <Link
                href={url}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-sm font-medium'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {status === 'unauthenticated' ? (
        <div className='space-x-2.5'>
          <AuthDialog
            trigger={
              <Button size='sm' variant='outline'>
                Login
              </Button>
            }
          />
          <AuthDialog trigger={<Button size='sm'>Sign up</Button>} />
        </div>
      ) : status === 'authenticated' ? (
        <div className='flex items-center gap-2.5'>
          <div className='hidden md:flex md:items-center md:gap-2.5'>
            <SearchDialog isMobile={false} />
          </div>
          <UserMenu />
        </div>
      ) : (
        <Skeleton className='w-32 h-8' />
      )}
    </nav>
  );
};

export default Navbar;

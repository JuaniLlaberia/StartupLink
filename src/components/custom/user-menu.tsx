'use client';

import Link from 'next/link';
import {
  Calendar1,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  User,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

import SearchDialog from './search-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useServerActionQuery } from '@/hooks/use-server-action';
import { getAuthUser } from '@/access-data/user/public-get-auth-user-by-email';
import { Skeleton } from '../ui/skeleton';

const LINKS = [
  {
    label: 'My startups',
    url: '/my-startups',
    icon: LayoutDashboard,
  },
  {
    label: 'Account settings',
    url: '/profile',
    icon: User,
  },
  {
    label: 'Create startup',
    url: '/startups/new',
    icon: PlusCircle,
  },
  {
    label: 'Events',
    url: '/my-events',
    icon: Calendar1,
  },
];

const UserMenu = () => {
  const { isLoading, data } = useServerActionQuery(getAuthUser, {
    input: undefined,
    queryKey: ['get-user'],
  });

  if (isLoading) return <Skeleton className='size-8' />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.image ? data.image : undefined} />
          <AvatarFallback>{data?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='p-0'>
        <DropdownMenuLabel className='flex flex-col font-normal px-2.5 py-2'>
          <span className='font-medium text-sm'>{data?.name}</span>
          <span className='text-xs text-muted-foreground'>{data?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='m-0' />
        <SearchDialog isMobile />
        {LINKS.map(({ label, url, icon: Icon }) => (
          <DropdownMenuItem
            key={url}
            className='rounded-none group pr-5'
            asChild
          >
            <Link href={url}>
              <Icon className='size-4 mr-0.5 text-muted-foreground group-hover:text-primary' />
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className='m-0' />
        <DropdownMenuItem
          className='rounded-none group pr-5'
          onClick={() => {
            signOut({ redirectTo: '/' });
          }}
        >
          <LogOut className='size-4 mr-0.5 ml-0.5 text-muted-foreground group-hover:text-primary' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

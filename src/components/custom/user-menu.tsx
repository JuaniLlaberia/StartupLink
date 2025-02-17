import Link from 'next/link';
import {
  Bookmark,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  User,
} from 'lucide-react';
import { getUser } from '@/access-data/user/get-auth-user';

import SignOutButton from '../auth/signout-button';
import ThemeButton from './theme-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

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
    label: 'Saved',
    url: '/startups/saved',
    icon: Bookmark,
  },
];

const UserMenu = async () => {
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image ? user.image : undefined} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='p-0'>
        <DropdownMenuLabel className='flex flex-col font-normal px-2.5 py-2'>
          <span className='font-medium text-sm'>{user.name}</span>
          <span className='text-xs text-muted-foreground'>{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='m-0' />
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
        <ThemeButton />
        <DropdownMenuSeparator className='m-0' />
        <SignOutButton
          trigger={
            <DropdownMenuItem className='rounded-none group pr-5'>
              <LogOut className='size-4 mr-0.5 ml-0.5 text-muted-foreground group-hover:text-primary' />
              Sign out
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

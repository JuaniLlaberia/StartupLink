import Link from 'next/link';

import Logo from './logo';
import AuthDialog from '../auth/auth-dialog';
import UserMenu from './user-menu';
import SearchDialog from './search-dialog';
import NotificationsMenu from './notifications-menu';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';
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
];

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className='flex items-center justify-between p-1'>
      <div className='flex items-center gap-8'>
        <Logo />
        <ul className='flex gap-2'>
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
      {!session ? (
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
      ) : (
        <div className='flex items-center gap-2.5'>
          <SearchDialog />
          <NotificationsMenu />
          <UserMenu />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

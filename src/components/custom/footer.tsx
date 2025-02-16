import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

const LINKS = [
  {
    label: 'Changelog',
    url: 'changelog',
  },
  {
    label: 'About',
    url: 'about',
  },
  {
    label: 'Feedback',
    url: 'feedback',
  },
  {
    label: 'Privacy',
    url: 'privacy',
  },
  {
    label: 'Terms',
    url: 'tos',
  },
];

const Footer = () => {
  return (
    <footer className='flex items-center justify-between p-1'>
      <h1 className='bg-gray-400 p-1 w-32 rounded-lg'>.</h1>
      <ul className='flex items-center gap-2'>
        {LINKS.map(({ label, url }) => (
          <li key={url}>
            <Link
              href={url}
              className={cn(
                buttonVariants({ variant: 'link', size: 'sm' }),
                'text-muted-foreground hover:text-primary transition-colors last:pr-0'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
        <span className='mx-2.5 text-muted-foreground'>|</span>
        <p className='text-muted-foreground text-xs font-medium'>
          StartupHub © {new Date().getFullYear()} All rights reserved
        </p>
      </ul>
    </footer>
  );
};

export default Footer;

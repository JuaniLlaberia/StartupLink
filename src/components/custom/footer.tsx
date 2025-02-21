import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import FeebackDialog from '../landing-page/feedback-dialog';
import Logo from './logo';
import { Separator } from '../ui/separator';

const LINKS = [
  {
    label: 'About',
    url: 'about',
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
    <footer className='flex flex-col-reverse justify-between md:flex-row p-1 gap-2.5'>
      <div className='flex items-center justify-between w-full'>
        <Logo />
        <p className='text-muted-foreground text-xs font-medium text-nowrap md:hidden'>
          StartupHub © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
      <Separator className='md:hidden' />
      <ul className='flex items-center justify-between gap-2'>
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
        <FeebackDialog />
        <span className='mx-2.5 text-muted-foreground hidden md:block'>|</span>
        <p className='text-muted-foreground text-xs font-medium text-nowrap hidden md:block'>
          StartupHub © {new Date().getFullYear()} All rights reserved
        </p>
      </ul>
    </footer>
  );
};

export default Footer;

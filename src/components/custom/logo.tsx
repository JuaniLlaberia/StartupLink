import Link from 'next/link';
import { Infinity } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ size = 'default' }: { size?: 'sm' | 'default' }) => {
  return (
    <Link href='/' className='flex items-center gap-2.5'>
      <div
        className={cn(
          'bg-violet-500 rounded-lg text-white',
          size === 'default' ? 'p-1.5' : 'p-1'
        )}
      >
        <Infinity
          className={cn(size === 'default' ? 'size-6' : 'size-5')}
          strokeWidth={2.25}
        />
      </div>
      <h1
        className={cn(
          'font-bold hidden md:block group-data-[collapsible=icon]:hidden',
          size === 'default' ? 'text-xl' : 'text-lg'
        )}
      >
        StartupLink
      </h1>
    </Link>
  );
};

export default Logo;

import Link from 'next/link';
import { ChevronRight, Infinity } from 'lucide-react';

import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { DotPattern } from '../magicui/dot-pattern';

const CallToAction = () => {
  return (
    <div className='py-16'>
      <div className='relative w-full flex flex-col items-center justify-center gap-10 bg-primary p-16 rounded-xl'>
        <div className='flex items-center justify-center size-20 bg-violet-500 rounded-lg z-50'>
          <Infinity className='size-14 text-white' />
        </div>
        <div className='space-y-4 z-50'>
          <h3 className='text-secondary text-5xl font-bold max-w-lg text-center'>
            Your startup journey starts here
          </h3>
          <h4 className='text-secondary/55 text-xl font-medium max-w-lg text-center'>
            Discover innovative startups, connect with the right people, and
            build the future together.
          </h4>
        </div>
        <Link
          href='/startups'
          className={cn(
            buttonVariants({ size: 'xl', variant: 'secondary' }),
            'group z-50'
          )}
        >
          Get started for free
          <ChevronRight className='group-hover:translate-x-1 transition-transform' />
        </Link>
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] opacity-50'
          )}
        />
      </div>
    </div>
  );
};

export default CallToAction;

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <div className='py-8 overflow-hidden mt-2'>
      <h1 className='text-8xl font-bold leading-tight'>
        Find your startup.
        <br />
        Meet your{' '}
        <span className='text-violet-500 bg-violet-200/60 p-1 rounded-lg'>
          partners.
        </span>
      </h1>
      <h2 className='text-3xl font-light max-w-5xl mt-8'>
        Discover startups, find the right co-founders and team members, and turn
        your vision into a thriving business.
      </h2>
      <div className='mt-12 space-x-3'>
        <Link
          href='/startups'
          className={cn(buttonVariants({ size: 'xl' }), 'group')}
        >
          Get started now
          <ChevronRight className='group-hover:translate-x-1 transition-transform' />
        </Link>
        <Link
          href='/about-us'
          className={cn(buttonVariants({ size: 'xl', variant: 'ghost' }))}
        >
          About us
        </Link>
      </div>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px),radial-gradient(1200px_at_50%_50%,rgba(255,255,255,0)_0%,white_100%)] bg-[size:6rem_4rem,6rem_4rem,auto] [mask-image:radial-gradient(ellipse_75%_80%_at_30%_5%,#000_70%,transparent_110%)]'></div>
    </div>
  );
};

export default Hero;

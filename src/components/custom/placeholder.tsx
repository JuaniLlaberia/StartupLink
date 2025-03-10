'use client';

import Link from 'next/link';
import { Building, Calendar1, HelpCircle, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PlaceholderType = 'startup' | 'people' | 'question' | 'event';

const typeIcon: Record<PlaceholderType, typeof Building> = {
  startup: Building,
  people: User,
  question: HelpCircle,
  event: Calendar1,
};

const Placeholder = ({
  type,
  redirect,
}: {
  type: PlaceholderType;
  redirect?: string;
}) => {
  const pathname = usePathname();
  const IconComponent = typeIcon[type];

  return (
    <div className='flex flex-col col-span-full gap-2 justify-center items-center py-10 lg:py-20 px-2'>
      <div className='border border-border rounded-xl p-3'>
        <IconComponent className='size-6' />
      </div>
      <h6 className='font-semibold'>No {type} found</h6>
      <p className='text-muted-foreground text-center max-w-[400px]'>
        We did not find any {type} that matches your filters.
        {redirect && (
          <>
            <span>You can </span>
            <Link href={redirect} className='underline'>
              create your own {type}.
            </Link>
          </>
        )}
      </p>
      <Link
        href={pathname}
        className={cn(
          buttonVariants({ variant: 'outline', size: 'sm' }),
          'mt-4 text-black'
        )}
      >
        Clear filters
      </Link>
    </div>
  );
};

export default Placeholder;

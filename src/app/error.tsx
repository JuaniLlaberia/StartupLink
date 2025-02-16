'use client';

import { TriangleAlert } from 'lucide-react';

import { GridPattern } from '@/components/magicui/grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NotFoundPage = ({ reset }: { reset: () => void }) => {
  return (
    <section>
      <div className='relative flex h-[calc(100dvh-7rem)] w-full flex-col items-center justify-center overflow-hidden bg-background'>
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
          )}
        />
        <div className='grid md:grid-cols-2 gap:6 w-full'>
          <div className='flex flex-col items-center justify-center'>
            <div className='space-y-2.5'>
              <Badge variant='destructive'>Error page</Badge>
              <div>
                <h1 className='text-3xl font-semibold'>
                  Something went wrong!
                </h1>
                <p className='text-sm text-muted-foreground max-w-md'>
                  We apologize for the inconvenience. Our team has been notified
                  and is working on a fix.
                </p>
              </div>
              <Button size='sm' variant='outline' onClick={() => reset()}>
                Try again
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex items-center justify-center size-44 rounded-full bg-muted'>
              <TriangleAlert
                className='size-16 text-muted-foreground/50'
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;

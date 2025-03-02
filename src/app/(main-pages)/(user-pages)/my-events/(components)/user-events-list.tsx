'use client';

import Link from 'next/link';
import { Event } from '@prisma/client';
import { Calendar1, LogOut, Mic, MoreHorizontal, Tv } from 'lucide-react';

import { formatEventTime } from '@/app/(dashboard)/dashboard/[startupId]/events/(helper)/format-event-time';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LeaveEventDialog from './leave-event-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

type UserEventsListProps = {
  events: (Event & { startup: { name: string; image: string | null } })[];
};

const UserEventsList = ({ events }: UserEventsListProps) => {
  if (events.length === 0)
    return (
      <div className='flex flex-col col-span-full gap-2 justify-center items-center py-10 lg:py-20 px-2'>
        <div className='border border-border rounded-xl p-3'>
          <Calendar1 className='size-6' />
        </div>
        <h6 className='font-semibold'>You haven&apos;t join any event yet</h6>
        <p className='text-muted-foreground text-center max-w-[400px]'>
          You can join one in the events page or create your own envet in your
          startup dashboard.
        </p>
        <Link href='/events' className={buttonVariants({ size: 'sm' })}>
          Browse events
        </Link>
      </div>
    );

  return (
    <ul>
      {events.map(event => (
        <li
          key={event.id}
          className='w-full max-w-2xl flex items-start gap-5 border border-border rounded-lg p-4'
        >
          <Avatar className='size-16'>
            <AvatarFallback>{event.startup.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={event.startup.image ?? undefined} />
          </Avatar>
          <div className='w-full'>
            <h3 className='text-sm font-semibold'>{event.name}</h3>
            <p className='text-sm text-muted-foreground max-w-lg'>
              {event.description}
            </p>
            <div className='flex items-center mt-3 gap-5'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Mic className='size-4' />
                <p>
                  <span className='text-sm'>Hosted by</span>{' '}
                  <span className='text-sm font-medium'>
                    <span>{event.startup.name}</span>
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Calendar1 className='size-4' />
                <p className='text-sm'>
                  <span>{formatEventTime(event.startTime)}</span>
                </p>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='size-6 p-0 hover:bg-muted'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal
                  className='size-4 text-muted-foreground'
                  strokeWidth={1.5}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isToday(event.startTime) && (
                <>
                  <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <Tv className='size-3.5 mr-2' strokeWidth={1.5} />
                    Go to event
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <LeaveEventDialog
                eventId={event.id}
                trigger={
                  <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <LogOut className='size-3.5 mr-2' strokeWidth={1.5} />
                    Leave event
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}
    </ul>
  );
};

export default UserEventsList;

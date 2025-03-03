import { Event } from '@prisma/client';
import { Calendar1, Edit, Link2, Plus, Trash2 } from 'lucide-react';

import EventForm from './event-form';
import DeleteEventDialog from './delete-event-dialog';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { formatEventTime } from '../(helper)/format-event-time';
import Link from 'next/link';

const EventsList = ({
  startupId,
  events,
}: {
  startupId: string;
  events: Event[];
}) => {
  return (
    <>
      {events.length > 0 ? (
        <>
          <ul className='mt-4 space-y-2'>
            {events.map(event => (
              <li
                key={event.id}
                className='w-full max-w-2xl flex items-center gap-6 border border-border rounded-lg p-4'
              >
                <div className='w-full'>
                  <h3 className='text-sm font-medium'>{event.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {event.description}
                  </p>
                  <div className='flex items-center mt-3 gap-5'>
                    <Badge
                      variant='secondary'
                      className='bg-violet-200/60 text-violet-500 hover:bg-violet-200/80'
                    >
                      Public
                    </Badge>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Calendar1 className='size-4' />
                      <p className='text-sm'>
                        <span>{formatEventTime(event.startTime)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Link
                    href={`/events/${event.id}`}
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'outline',
                    })}
                  >
                    <Link2 /> Preview
                  </Link>

                  <EventForm
                    startupId={startupId}
                    data={event}
                    trigger={
                      <Button size='sm' variant='outline'>
                        <Edit /> Edit event
                      </Button>
                    }
                  />

                  <DeleteEventDialog
                    eventId={event.id}
                    startupId={startupId}
                    eventName={event.name}
                    trigger={
                      <Button size='icon' variant='outline' className='size-7'>
                        <Trash2 className='text-red-500' />
                      </Button>
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
          <EventForm
            startupId={startupId}
            trigger={
              <Button size='sm' className='mt-4'>
                <Plus /> Create new event
              </Button>
            }
          />
        </>
      ) : (
        <div className='flex flex-col col-span-full gap-2 justify-center items-center py-10 lg:py-20 px-2'>
          <div className='border border-border rounded-xl p-3'>
            <Calendar1 className='size-6' />
          </div>
          <h6 className='font-semibold'>No events found</h6>
          <p className='text-muted-foreground text-center max-w-[400px]'>
            You can create either public or private events for your members.
          </p>
          <EventForm
            startupId={startupId}
            trigger={
              <Button size='sm' className='mt-4'>
                <Plus /> Create new event
              </Button>
            }
          />
        </div>
      )}
    </>
  );
};

export default EventsList;

import Link from 'next/link';
import {
  AlertTriangle,
  CalendarDays,
  Clock,
  ExternalLink,
  Mic,
} from 'lucide-react';

import { getEvent } from '@/access-data/event/get-event';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const EventPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  const event = await getEvent({ eventId });

  const eventType = event.embedCode ? 'embed' : 'external';

  return (
    <section className='py-8 p-1'>
      <header>
        <h1 className='text-3xl font-semibold'>{event.name}</h1>
        <p className='text-lg text-muted-foreground'>{event.description}</p>
        <div className='mt-2.5 w-full'></div>
      </header>
      {eventType === 'embed' ? (
        <div>
          <div className='flex items-center justify-end gap-2.5'>
            <p className='text-muted-foreground text-sm'>Hosted by</p>
            <div className='flex items-center gap-1.5'>
              <Avatar>
                <AvatarFallback>{event.startup.name.charAt(0)}</AvatarFallback>
                <AvatarImage src={event.startup.image ?? undefined} />
              </Avatar>
              <p className='font-medium'>{event.startup.name}</p>
            </div>
          </div>
          <div className='flex items-center justify-center mt-6'>
            <div className='w-full h-[80dvh] border border-border rounded-lg overflow-hidden'>
              <iframe
                className='w-full h-full'
                src={`https://www.youtube.com/embed/${event.embedCode}`}
                title={event.name}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ) : event.streamingLink ? (
        <div>
          <ul className='max-w-3xl space-y-3'>
            <li className='flex items-center'>
              <Mic className='text-muted-foreground mr-2' size={20} />
              <div className='flex items-center justify-end gap-2.5'>
                <p className='text-muted-foreground text-sm'>Hosted by</p>
                <div className='flex items-center gap-1.5'>
                  <Avatar>
                    <AvatarFallback>
                      {event.startup.name.charAt(0)}
                    </AvatarFallback>
                    <AvatarImage src={event.startup.image ?? undefined} />
                  </Avatar>
                  <p className='font-medium'>{event.startup.name}</p>
                </div>
              </div>
            </li>
            <li className='flex items-center'>
              <CalendarDays className='text-muted-foreground mr-2' size={20} />
              <span className='text-sm'>October 26-28, 2024</span>
            </li>
            <li className='flex items-center'>
              <Clock className='text-muted-foreground mr-2' size={20} />
              <span className='text-sm'>9:00 AM - 5:00 PM</span>
            </li>
          </ul>
          <Link
            href={event.streamingLink}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-5')}
          >
            Go to event <ExternalLink className='size-4' />
          </Link>
        </div>
      ) : (
        <Alert variant='destructive'>
          <AlertTriangle className='size-4' />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            There is a problem with this event. Try again!
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
};

export default EventPage;

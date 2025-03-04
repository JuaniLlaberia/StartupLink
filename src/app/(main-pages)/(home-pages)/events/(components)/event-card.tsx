'use client';

import { Calendar1, ChevronRight, Loader2, Mic } from 'lucide-react';
import { toast } from 'sonner';

import { formatEventTime } from '@/app/(dashboard)/dashboard/[startupId]/events/(helper)/format-event-time';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { joinEvent as joinEventAction } from '@/actions/event/join-event';

type EventCardProps = {
  data: {
    id: string;
    name: string;
    description: string | null;
    startTime: Date;
    endTime: Date | null;
    createdAt: Date;
    startup: {
      name: string;
      image: string | null;
    };
  };
};

const EventCard = ({ data }: EventCardProps) => {
  const { mutate: joinEvent, isPending } = useServerActionMutation(
    joinEventAction,
    {
      mutationKey: ['join-event'],
      onSuccess: () =>
        toast.success('You have joined the event', {
          description: 'You can access the event on the same day.',
        }),
      onError: () => toast.error('Failed to join event'),
    }
  );

  return (
    <li
      key={data.id}
      className='w-full max-w-4xl flex items-start gap-5 border border-border rounded-lg p-4'
    >
      <Avatar className='size-16'>
        <AvatarFallback>{data.startup.name.charAt(0)}</AvatarFallback>
        <AvatarImage src={data.startup.image ?? undefined} />
      </Avatar>
      <div className='w-full'>
        <h3 className='text-sm font-semibold'>{data.name}</h3>
        <p className='text-sm text-muted-foreground max-w-lg'>
          {data.description}
        </p>
        <div className='flex items-center mt-3 gap-5'>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Mic className='size-4' />
            <p>
              <span className='text-sm'>Hosted by</span>{' '}
              <span className='text-sm font-medium'>
                <span>{data.startup.name}</span>
              </span>
            </p>
          </div>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Calendar1 className='size-4' />
            <p className='text-sm'>
              <span>{formatEventTime(data.startTime)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='my-auto'>
        <Button
          disabled={isPending}
          size='sm'
          className='group'
          onClick={() => {
            joinEvent({ eventId: data.id });
          }}
        >
          {isPending && <Loader2 className='size-4 animate-spin' />}
          Join event
          {!isPending && (
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          )}
        </Button>
      </div>
    </li>
  );
};

export default EventCard;

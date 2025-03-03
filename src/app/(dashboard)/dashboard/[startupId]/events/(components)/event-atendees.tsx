import { List } from 'lucide-react';

import { getAtendees } from '@/access-data/event/get-atendees';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type EventAtendeesProps = {
  eventId: string;
  startupId: string;
};

const EventAtendees = async ({ eventId, startupId }: EventAtendeesProps) => {
  const atendees = await getAtendees({ eventId, startupId });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='size-7'>
          <List className='size-4' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Event atendees</SheetTitle>
          <SheetDescription>
            This are all the users that have enrolled in your event. You can
            manage them here.
          </SheetDescription>
        </SheetHeader>
        <ul className='mt-5'>
          {atendees.map(atendee => (
            <li
              key={atendee.user.id}
              className='flex items-center gap-4 border border-border rounded-lg p-2'
            >
              <Avatar className='size-12 border border-border'>
                <AvatarFallback>{atendee.user.name?.charAt(0)}</AvatarFallback>
                <AvatarImage src={atendee.user.image ?? undefined} />
              </Avatar>

              <div>
                <p className='font-medium text-sm'>{atendee.user.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {atendee.user.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className='flex justify-end items-center mt-2.5'>
          <Badge
            variant='secondary'
            className='bg-violet-200/60 hover:bg-violet-200/60 text-violet-500'
          >
            Total: {atendees.length}
          </Badge>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EventAtendees;

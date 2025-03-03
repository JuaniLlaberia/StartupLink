'server only';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { redirect } from 'next/navigation';

type getEventsProps = {
  eventId: string;
};

export const getEvent = async ({ eventId }: getEventsProps) => {
  const userId = await getAuthUser();

  const isAtendee = await db.eventAttendee.findFirst({
    where: {
      userId,
      eventId,
    },
    select: { id: true },
  });
  if (!isAtendee) redirect('/my-events');

  const event = await db.event.findUnique({
    where: { id: eventId },
    include: { startup: { select: { name: true, image: true } } },
  });
  if (!event) redirect('/my-events');

  return event;
};

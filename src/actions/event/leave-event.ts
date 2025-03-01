'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const leaveEventValidator = z.object({
  eventId: z.string(),
});

export const leaveEvent = authenticatedAction
  .createServerAction()
  .input(leaveEventValidator)
  .handler(async ({ input: { eventId }, ctx: { userId } }) => {
    const event = await db.event.findUnique({ where: { id: eventId } });
    if (!event) throw new Error('Event not found');

    await db.eventAttendee.delete({
      where: {
        id: eventId,
        userId,
      },
    });
  });

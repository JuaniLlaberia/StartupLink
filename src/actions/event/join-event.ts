'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const joinEventValidator = z.object({
  eventId: z.string(),
});

export const joinEvent = authenticatedAction
  .createServerAction()
  .input(joinEventValidator)
  .handler(async ({ input: { eventId }, ctx: { userId } }) => {
    const event = await db.event.findUnique({ where: { id: eventId } });

    if (!event) throw new Error('Event not found');
    if (event.visibility === 'PRIVATE') {
      const member = await db.startupMember.findUnique({
        where: { startupId_userId: { startupId: event.startupId, userId } },
      });

      if (!member) throw new Error('This is a private event, you can not join');
    }

    await db.eventAttendee.create({
      data: {
        userId,
        eventId,
      },
    });
  });

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { EventVisibility } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const createEventValidator = z.object({
  name: z.string().min(1, 'Must provide an event name'),
  description: z.optional(z.string()),
  startTime: z.date(),
  endTime: z.optional(z.date()),
  visibility: z.nativeEnum(EventVisibility),
  streamingLink: z.optional(z.string()),
  embedCode: z.optional(z.string()),
  startupId: z.string(),
});

export const createEvent = authenticatedAction
  .createServerAction()
  .input(createEventValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const isMember = await isStartupMember(input.startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    const { id: eventId } = await db.event.create({
      data: { ...input },
    });

    if (input.visibility === 'PRIVATE') {
      // Add all members as is a private event
      const startupMembers = await db.startupMember.findMany({
        where: { startupId: input.startupId },
        select: {
          userId: true,
        },
      });

      if (startupMembers.length > 0) {
        await db.eventAttendee.createMany({
          data: startupMembers.map(member => ({
            eventId,
            userId: member.userId,
          })),
        });
      }
    } else {
      // Add just who created the event (PUBLIC)
      await db.eventAttendee.create({
        data: {
          eventId,
          userId,
        },
      });
    }

    revalidatePath(`/dashboard/${input.startupId}/events`);
  });

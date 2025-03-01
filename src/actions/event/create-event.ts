'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { EventVisibility } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

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
    await hasAdminPermissions(input.startupId, userId);

    const { id: eventId } = await db.event.create({
      data: { ...input },
    });

    await db.eventAttendee.create({
      data: {
        eventId,
        userId,
      },
    });

    revalidatePath(`/dashboard/${input.startupId}/events`);
  });

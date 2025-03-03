'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const deleteEventValidator = z.object({
  eventId: z.string(),
  startupId: z.string(),
});

export const deleteEvent = authenticatedAction
  .createServerAction()
  .input(deleteEventValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await isStartupMember(input.startupId, userId);

    await db.event.delete({
      where: { id: input.eventId },
    });

    revalidatePath(`/dashboard/${input.startupId}/events`);
  });

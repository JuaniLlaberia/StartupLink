'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const deleteEventValidator = z.object({
  eventId: z.string(),
  startupId: z.string(),
});

export const deleteEvent = authenticatedAction
  .createServerAction()
  .input(deleteEventValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await hasAdminPermissions(input.startupId, userId);

    await db.event.delete({
      where: { id: input.eventId },
    });

    revalidatePath(`/dashboard/${input.startupId}/events`);
  });

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { EventVisibility } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const updateEventValidator = z.object({
  id: z.string(),
  name: z.string().min(1, 'Must provide an event name'),
  description: z.optional(z.string()),
  startTime: z.date(),
  endTime: z.optional(z.date()),
  visibility: z.nativeEnum(EventVisibility),
  streamingLink: z.optional(z.string()),
  embedCode: z.optional(z.string()),
  startupId: z.string(),
});

export const updateEvent = authenticatedAction
  .createServerAction()
  .input(updateEventValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const isMember = await isStartupMember(input.startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    await db.event.update({
      where: { id: input.id },
      data: { ...input },
    });

    revalidatePath(`/dashboard/${input.startupId}/events`);
  });

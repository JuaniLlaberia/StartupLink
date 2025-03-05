'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const toggleUpvoteValidator = z.object({
  startupId: z.string(),
});

export const toggleUpvote = authenticatedAction
  .createServerAction()
  .input(toggleUpvoteValidator)
  .handler(async ({ input: { startupId }, ctx: { userId } }) => {
    const alreadyVoted = await db.upvote.findFirst({
      where: { startupId, userId },
      select: { id: true },
    });

    if (alreadyVoted) {
      await db.upvote.delete({ where: { id: alreadyVoted.id } });
    } else {
      await db.upvote.create({
        data: {
          startupId,
          userId,
        },
      });
    }

    revalidatePath('/startups');
  });

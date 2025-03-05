import { z } from 'zod';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const upvoteStartupValidator = z.object({
  startupId: z.string(),
});

export const upvoteStartup = authenticatedAction
  .createServerAction()
  .input(upvoteStartupValidator)
  .handler(async ({ input: { startupId }, ctx: { userId } }) => {
    const existingUpvote = await db.upvote.findUnique({
      where: { userId_startupId: { userId, startupId } },
    });

    if (existingUpvote) {
      await db.upvote.delete({
        where: { id: existingUpvote.id },
      });
      return;
    }

    db.upvote.create({ data: { userId, startupId } });
  });

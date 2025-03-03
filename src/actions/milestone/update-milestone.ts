import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const updateMilestoneValidator = z.object({
  id: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
  date: z.optional(z.date()),
  startupId: z.string(),
});

export const updateMilestone = authenticatedAction
  .createServerAction()
  .input(updateMilestoneValidator)
  .handler(async ({ input: { id, startupId, ...data }, ctx: { userId } }) => {
    await isStartupMember(startupId, userId);

    await db.milestone.update({
      where: { id },
      data: {
        ...data,
      },
    });
  });

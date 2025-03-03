import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const deleteMilestoneValidator = z.object({
  id: z.string(),
  startupId: z.string(),
});

export const deleteMilestone = authenticatedAction
  .createServerAction()
  .input(deleteMilestoneValidator)
  .handler(async ({ input: { id, startupId }, ctx: { userId } }) => {
    await isStartupMember(startupId, userId);

    await db.milestone.delete({
      where: { id },
    });
  });

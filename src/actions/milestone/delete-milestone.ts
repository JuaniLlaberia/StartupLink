import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { hasAdminPermissions } from '../helpers';
import { db } from '@/db';

const deleteMilestoneValidator = z.object({
  id: z.string(),
  startupId: z.string(),
});

export const deleteMilestone = authenticatedAction
  .createServerAction()
  .input(deleteMilestoneValidator)
  .handler(async ({ input: { id, startupId }, ctx: { userId } }) => {
    await hasAdminPermissions(startupId, userId);

    await db.milestone.delete({
      where: { id },
    });
  });

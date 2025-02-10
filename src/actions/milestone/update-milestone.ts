import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { hasAdminPermissions } from '../helpers';
import { db } from '@/db';

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
    await hasAdminPermissions(startupId, userId);

    await db.milestone.update({
      where: { id },
      data: {
        ...data,
      },
    });
  });

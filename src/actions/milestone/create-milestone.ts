import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { hasAdminPermissions } from '../helpers';
import { db } from '@/db';

const createMilestoneValidator = z.object({
  title: z.string().min(1, 'Must provide a milestone title'),
  description: z.string().min(10, 'Description must be at least 10 charc.'),
  date: z.date(),
  startupId: z.string(),
});

export const createMilestone = authenticatedAction
  .createServerAction()
  .input(createMilestoneValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await hasAdminPermissions(input.startupId, userId);

    await db.milestone.create({
      data: {
        ...input,
      },
    });
  });

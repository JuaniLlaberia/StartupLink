import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

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
    await isStartupMember(input.startupId, userId);

    await db.milestone.create({
      data: {
        ...input,
      },
    });
  });

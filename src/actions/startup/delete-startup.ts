'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const deleteStartupValidator = z.object({
  id: z.string(),
});

export const deleteStartup = authenticatedAction
  .createServerAction()
  .input(deleteStartupValidator)
  .handler(async ({ input: { id }, ctx: { userId } }) => {
    const startup = await db.startup.findUnique({
      where: { id },
      select: { createdBy: true },
    });
    if (startup?.createdBy !== userId)
      throw new Error('You have no permission to perform this action');

    await db.startup.delete({ where: { id } });
  });

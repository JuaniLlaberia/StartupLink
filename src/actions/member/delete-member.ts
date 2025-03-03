'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const deleteMemberValidator = z.object({
  id: z.string(),
  startupId: z.string(),
});

export const deleteMember = authenticatedAction
  .createServerAction()
  .input(deleteMemberValidator)
  .handler(async ({ input: { id, startupId }, ctx: { userId } }) => {
    await isStartupMember(startupId, userId);

    await db.startupMember.delete({
      where: { id },
    });
  });

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
    const isMember = await isStartupMember(startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    await db.startupMember.delete({
      where: { id },
    });
  });

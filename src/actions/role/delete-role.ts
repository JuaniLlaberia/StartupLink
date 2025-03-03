'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const deleteRoleValidator = z.object({
  id: z.string(),
  startupId: z.string(),
});

export const deleteRole = authenticatedAction
  .createServerAction()
  .input(deleteRoleValidator)
  .handler(async ({ input: { id, startupId }, ctx: { userId } }) => {
    await isStartupMember(startupId, userId);

    await db.startupRole.delete({
      where: { id },
    });

    revalidatePath(`/dashboard/${startupId}/roles`);
  });

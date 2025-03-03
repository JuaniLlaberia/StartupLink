'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const updateRoleValidator = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  startupId: z.string(),
});

export const updateRole = authenticatedAction
  .createServerAction()
  .input(updateRoleValidator)
  .handler(async ({ input: { id, startupId, ...data }, ctx: { userId } }) => {
    await isStartupMember(startupId, userId);

    await db.startupRole.update({
      where: { id },
      data: { ...data },
    });

    revalidatePath(`/dashboard/${startupId}/roles`);
  });

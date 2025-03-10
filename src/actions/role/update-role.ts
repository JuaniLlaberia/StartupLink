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
  requiresSurvey: z.boolean(),
  active: z.boolean(),
  surveyId: z.optional(z.string()),
});

export const updateRole = authenticatedAction
  .createServerAction()
  .input(updateRoleValidator)
  .handler(async ({ input: { id, startupId, ...data }, ctx: { userId } }) => {
    const isMember = await isStartupMember(startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    await db.startupRole.update({
      where: { id },
      data: { ...data },
    });

    revalidatePath(`/dashboard/${startupId}/roles`);
  });

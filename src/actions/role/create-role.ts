'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const createRoleValidator = z.object({
  name: z.string().min(1, 'Must provide a role name'),
  description: z.optional(z.string()),
  active: z.boolean(),
  requiresSurvey: z.boolean(),
  startupId: z.string(),
  surveyId: z.optional(z.string()),
});

export const createRole = authenticatedAction
  .createServerAction()
  .input(createRoleValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await isStartupMember(input.startupId, userId);

    await db.startupRole.create({
      data: { ...input },
    });

    revalidatePath(`/dashboard/${input.startupId}/roles`);
  });

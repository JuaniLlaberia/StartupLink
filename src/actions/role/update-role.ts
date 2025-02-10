'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const updateRoleValidator = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  admin: z.optional(z.boolean()),
  startupId: z.string(),
});

export const updateRole = authenticatedAction
  .createServerAction()
  .input(updateRoleValidator)
  .handler(async ({ input: { id, startupId, ...data }, ctx: { userId } }) => {
    await hasAdminPermissions(startupId, userId);

    await db.startupRole.update({
      where: { id },
      data: { ...data },
    });
  });

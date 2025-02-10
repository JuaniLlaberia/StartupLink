'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const createRoleValidator = z.object({
  name: z.string().min(1, 'Must provide a role name'),
  admin: z.boolean(),
  startupId: z.string(),
});

export const createRole = authenticatedAction
  .createServerAction()
  .input(createRoleValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await hasAdminPermissions(input.startupId, userId);

    await db.startupRole.create({
      data: { ...input },
    });
  });

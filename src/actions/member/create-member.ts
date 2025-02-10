'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const createMemberValidator = z.object({
  startupId: z.string(),
  userId: z.string(),
  roleId: z.string(),
});

export const createMember = authenticatedAction
  .createServerAction()
  .input(createMemberValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await hasAdminPermissions(input.startupId, userId);

    await db.startupMember.create({
      data: { ...input },
    });
  });

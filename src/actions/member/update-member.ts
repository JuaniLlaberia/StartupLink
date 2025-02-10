'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const updateMemberValidator = z.object({
  id: z.string(),
  roleId: z.string(),
  startupId: z.string(),
});

export const updateMember = authenticatedAction
  .createServerAction()
  .input(updateMemberValidator)
  .handler(async ({ input: { id, roleId, startupId }, ctx: { userId } }) => {
    await hasAdminPermissions(startupId, userId);

    await db.startupMember.update({
      where: { id },
      data: { roleId },
    });
  });

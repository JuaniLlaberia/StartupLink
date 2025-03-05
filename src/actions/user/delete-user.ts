'use server';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

export const deleteUser = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx: { userId } }) => {
    await db.startup.delete({ where: { id: userId } });
  });

'use server';

import { z } from 'zod';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const markReacNotificaitonSchemaValidator = z.object({
  id: z.string(),
});

export const markReacNotificaiton = authenticatedAction
  .createServerAction()
  .input(markReacNotificaitonSchemaValidator)
  .handler(async ({ input: { id } }) => {
    await db.notification.update({ where: { id }, data: { isRead: true } });
  });

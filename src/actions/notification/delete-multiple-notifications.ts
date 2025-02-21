'use server';

import { z } from 'zod';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const deleteMultipleNotificationsSchemaValidator = z.object({
  ids: z.array(z.string()),
});

export const deleteMultipleNotifications = authenticatedAction
  .createServerAction()
  .input(deleteMultipleNotificationsSchemaValidator)
  .handler(async ({ input: { ids } }) => {
    await Promise.all(ids.map(id => db.notification.delete({ where: { id } })));
  });

'use server';

import { z } from 'zod';
import { NotificationType } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { generateNotificationMessage } from './helper';
import { db } from '@/db';

const createNotificationSchemaValidator = z.object({
  receiverId: z.string(),
  type: z.nativeEnum(NotificationType),
  entityId: z.string(),

  // For the notification message
  startupName: z.optional(z.string()),
  userName: z.optional(z.string()),
  role: z.optional(z.string()),
  questionId: z.optional(z.string()),
  answererName: z.optional(z.string()),
});

export const createNotification = authenticatedAction
  .createServerAction()
  .input(createNotificationSchemaValidator)
  .handler(async ({ input }) => {
    const message = generateNotificationMessage(input);

    const { type, entityId, receiverId } = input;
    await db.notification.create({
      data: {
        type,
        entityId,
        message,
        receiverId,
      },
    });
  });

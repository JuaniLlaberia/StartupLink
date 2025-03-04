'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const createApplicationValidator = z.object({
  startupId: z.string(),
  roleId: z.string(),
  surveyResponse: z.optional(z.string()),
});

export const createApplication = authenticatedAction
  .createServerAction()
  .input(createApplicationValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { id: applicationId } = await db.startupApplication.create({
      data: {
        ...input,
        userId,
      },
    });

    return applicationId;
  });

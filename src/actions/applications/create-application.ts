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
    // Check if user is already a member of the startup
    const existingMembership = await db.startupMember.findUnique({
      where: { startupId_userId: { startupId: input.startupId, userId } },
    });
    if (existingMembership)
      throw new Error('You are already a member of this startup');

    // Check if user has already applied to this role
    const existingApplication = await db.startupApplication.findFirst({
      where: {
        startupId: input.startupId,
        roleId: input.roleId,
        userId: userId,
      },
    });
    if (existingApplication)
      throw new Error('You have already applied to this role');

    // Create the application if all checks pass
    const { id: applicationId } = await db.startupApplication.create({
      data: {
        ...input,
        userId,
      },
    });

    return applicationId;
  });

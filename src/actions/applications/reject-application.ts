'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const rejectApplicationValidator = z.object({
  startupId: z.string(),
  applicationId: z.string(),
});

export const rejectApplication = authenticatedAction
  .createServerAction()
  .input(rejectApplicationValidator)
  .handler(async ({ input: { startupId, applicationId }, ctx: { userId } }) => {
    const isMember = await isStartupMember(startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    const application = await db.startupApplication.findUnique({
      where: { id: applicationId },
    });
    if (!application) throw new Error('Application not found');

    await db.startupApplication.delete({ where: { id: application.id } });

    revalidatePath(`/dashboard/${startupId}/applications`);
  });

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const leaveStartupValidator = z.object({
  id: z.string(),
});

export const leaveStartup = authenticatedAction
  .createServerAction()
  .input(leaveStartupValidator)
  .handler(async ({ input: { id }, ctx: { userId } }) => {
    const startupMember = await db.startupMember.findUnique({
      where: { startupId_userId: { startupId: id, userId } },
      select: { id: true },
    });

    if (!startupMember || !startupMember?.id)
      throw new Error('You are not a member of this startup');

    await db.startupMember.delete({ where: { id: startupMember.id } });

    revalidatePath('/my-startups');
  });

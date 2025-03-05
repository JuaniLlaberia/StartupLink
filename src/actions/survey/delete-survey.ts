'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const deleteSurveyValidator = z.object({
  surveyId: z.string(),
  startupId: z.string(),
});

export const deleteSurvey = authenticatedAction
  .createServerAction()
  .input(deleteSurveyValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { surveyId, startupId } = input;
    const isMember = await isStartupMember(startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    await db.survey.delete({
      where: { id: surveyId },
    });

    revalidatePath(`/dashboard/${startupId}/surveys`);
  });

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const deleteSurveyValidator = z.object({
  surveyId: z.string(),
  startupId: z.string(),
});

export const deleteSurvey = authenticatedAction
  .createServerAction()
  .input(deleteSurveyValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { surveyId, startupId } = input;
    await hasAdminPermissions(startupId, userId);

    await db.survey.delete({
      where: { id: surveyId },
    });

    revalidatePath(`/dashboard/${startupId}/surveys`);
  });

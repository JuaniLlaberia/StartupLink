'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { QuestionSchema } from './survey-types';
import { isStartupMember } from '@/access-data/helper';

const updateSurveyValidator = z.object({
  surveyId: z.string(),
  name: z.string().min(1, 'Must provide a survey name'),
  description: z.optional(z.string()),
  startupId: z.string(),
  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question is required'),
});

export const updateSurvey = authenticatedAction
  .createServerAction()
  .input(updateSurveyValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { surveyId, startupId, name, description, questions } = input;
    const isMember = await isStartupMember(startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    await db.survey.update({
      where: { id: surveyId },
      data: {
        name,
        description,
        questions,
      },
    });
  });

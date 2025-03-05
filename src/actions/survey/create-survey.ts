'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { QuestionSchema } from './survey-types';
import { isStartupMember } from '@/access-data/helper';

const createSurveyValidator = z.object({
  name: z.string().min(1, 'Must provide a survey name'),
  description: z.optional(z.string()),
  startupId: z.string().min(1, 'Startup ID is required'),
  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question is required'),
});

export const createSurvey = authenticatedAction
  .createServerAction()
  .input(createSurveyValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { startupId, name, description, questions } = input;
    const isMember = await isStartupMember(startupId, userId);
    if (!isMember) throw new Error('Need to be a member');

    const { id: surveyId } = await db.survey.create({
      data: {
        name,
        description,
        startupId,
        questions,
      },
    });

    return surveyId;
  });

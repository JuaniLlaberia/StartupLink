import { z } from 'zod';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const updateQuestionValidator = z.object({
  id: z.string(),
  question: z.optional(z.string()),
  tags: z.array(z.string()),
});

export const updateQuestion = authenticatedAction
  .createServerAction()
  .input(updateQuestionValidator)
  .handler(async ({ input: { id, question, tags }, ctx: { userId } }) => {
    const questionDb = await db.question.findUnique({
      where: { id },
      select: { createdBy: true },
    });
    if (questionDb?.createdBy !== userId)
      throw new Error('You have no permission to perform this action');

    await db.question.update({
      where: { id },
      data: { question, tags, edited: true },
    });
  });

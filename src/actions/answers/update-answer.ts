'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const updateAnswerValidator = z.object({
  id: z.string(),
  answer: z.optional(z.string()),
});

export const updateAnswer = authenticatedAction
  .createServerAction()
  .input(updateAnswerValidator)
  .handler(async ({ input: { id, answer }, ctx: { userId } }) => {
    const answerDB = await db.answer.findUnique({
      where: { id },
      select: { createdBy: true, questionId: true },
    });
    if (answerDB?.createdBy !== userId)
      throw new Error('You have no permission to perform this action');

    await db.answer.update({ where: { id }, data: { answer, edited: true } });

    revalidatePath(`/forum/${answerDB.questionId}`);
  });

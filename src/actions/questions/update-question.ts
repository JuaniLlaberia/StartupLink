'use server';

import { z } from 'zod';
import { QuestionType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const updateQuestionValidator = z.object({
  id: z.string(),
  question: z.optional(z.string()),
  tags: z.array(z.string()),
  type: z.nativeEnum(QuestionType),
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

    const { id: questionId } = await db.question.update({
      where: { id },
      data: { question, tags, edited: true },
    });

    revalidatePath(`/forum/${questionId}`);

    return questionId;
  });

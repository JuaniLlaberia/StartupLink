'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const createAnswerValidator = z.object({
  questionId: z.string(),
  answer: z.string().min(1, 'Must provide a answer'),
});

export const createAnswer = authenticatedAction
  .createServerAction()
  .input(createAnswerValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const question = await db.question.findUnique({
      where: { id: input.questionId },
      select: { id: true, createdBy: true },
    });
    if (!question) throw new Error('Question not found');

    const { id: answerId } = await db.answer.create({
      data: { ...input, questionId: question.id, createdBy: userId },
    });

    revalidatePath(`/forum/${input.questionId}`);

    return answerId;
  });

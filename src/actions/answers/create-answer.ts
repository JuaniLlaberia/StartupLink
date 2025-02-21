'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

const createAnswerValidator = z.object({
  questionId: z.string(),
  answer: z.string().min(1, 'Must provide a answer'),
});

export const createAnswer = authenticatedAction
  .createServerAction()
  .input(createAnswerValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { id: answerId } = await db.answer.create({
      data: { ...input, createdBy: userId },
    });

    revalidatePath(`/forum/${input.questionId}`);

    return answerId;
  });

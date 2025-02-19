'use server';

import { z } from 'zod';
import { QuestionType } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const createQuestionValidator = z.object({
  question: z.string().min(1, 'Must provide a question'),
  tags: z.array(z.string()),
  type: z.nativeEnum(QuestionType),
});

export const createQuestion = authenticatedAction
  .createServerAction()
  .input(createQuestionValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { id: questionId } = await db.question.create({
      data: { ...input, createdBy: userId },
    });

    return questionId;
  });

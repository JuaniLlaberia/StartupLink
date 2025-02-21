'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { createNotification } from '../notification/create-notification';
import { getUser } from '@/access-data/user/get-user';

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

    if (userId !== question.createdBy) {
      const userName = await getUser({ userId });

      await createNotification({
        type: 'FORUM_ANSWER',
        receiverId: question.createdBy,
        entityId: question.id,
        answererName: userName.name as string,
      });
    }

    revalidatePath(`/forum/${input.questionId}`);

    return answerId;
  });

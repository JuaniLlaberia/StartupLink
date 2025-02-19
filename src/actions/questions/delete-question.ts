'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const deleteQuestionValidator = z.object({
  id: z.string(),
});

export const deleteQuestion = authenticatedAction
  .createServerAction()
  .input(deleteQuestionValidator)
  .handler(async ({ input: { id }, ctx: { userId } }) => {
    const question = await db.question.findUnique({
      where: { id },
      select: { createdBy: true },
    });
    if (question?.createdBy !== userId)
      throw new Error('You have no permission to perform this action');

    await db.question.delete({ where: { id } });

    revalidatePath('/forum');
  });

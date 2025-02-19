'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const deleteAnswerValidator = z.object({
  id: z.string(),
});

export const deleteAnswer = authenticatedAction
  .createServerAction()
  .input(deleteAnswerValidator)
  .handler(async ({ input: { id }, ctx: { userId } }) => {
    const answer = await db.answer.findUnique({
      where: { id },
      select: { createdBy: true },
    });
    if (answer?.createdBy !== userId)
      throw new Error('You have no permission to perform this action');

    await db.answer.delete({ where: { id } });

    revalidatePath('/forum');
  });

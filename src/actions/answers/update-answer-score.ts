import { z } from 'zod';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const updateAnswerScoreValidator = z.object({
  id: z.string(),
  type: z.enum(['increment', 'decrement']),
});

export const updateAnswerScore = authenticatedAction
  .createServerAction()
  .input(updateAnswerScoreValidator)
  .handler(async ({ input: { id, type } }) => {
    const score = type === 'increment' ? { increment: 1 } : { decrement: 1 };

    await db.answer.update({ where: { id }, data: { score } });
  });

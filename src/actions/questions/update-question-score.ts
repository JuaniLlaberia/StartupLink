import { z } from 'zod';

import { db } from '@/db';
import { authenticatedAction } from '@/lib/safe-actions';

const updateQuestionScoreValidator = z.object({
  id: z.string(),
  type: z.enum(['increment', 'decrement']),
});

export const updateQuestionScore = authenticatedAction
  .createServerAction()
  .input(updateQuestionScoreValidator)
  .handler(async ({ input: { id, type } }) => {
    const score = type === 'increment' ? { increment: 1 } : { decrement: 1 };

    await db.question.update({ where: { id }, data: { score } });
  });

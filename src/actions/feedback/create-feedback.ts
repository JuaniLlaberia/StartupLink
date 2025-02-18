'use server';

import { z } from 'zod';
import { createServerAction } from 'zsa';

import { db } from '@/db';

const createFeedbackValidator = z.object({
  email: z.string().min(1, 'Must provide an email'),
  feedback: z.string().min(1, 'Must provide feedback'),
});

export const createFeedback = createServerAction()
  .input(createFeedbackValidator)
  .handler(async ({ input: { email, feedback } }) => {
    const recentFeedback = await db.feedback.findFirst({
      where: {
        email,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (recentFeedback) {
      throw new Error('You can only submit feedback once every 24 hours');
    }

    return db.feedback.create({
      data: { email, feedback },
    });
  });

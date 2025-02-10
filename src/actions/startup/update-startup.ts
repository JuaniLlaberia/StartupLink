'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const updateStartupValidator = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  mission: z.optional(z.string()),
  location: z.string(),
  stage: z.optional(z.string()),
  industry: z.optional(z.string()),
  teamSize: z.optional(z.number()),
  image: z.optional(z.string()),
  coverImage: z.optional(z.string()),
  skills: z.optional(z.array(z.string())),
});

export const createStartup = authenticatedAction
  .createServerAction()
  .input(updateStartupValidator)
  .handler(async ({ input: { id, ...data }, ctx: { userId } }) => {
    await hasAdminPermissions(id, userId);

    await db.startup.update({
      where: { id },
      data: {
        ...data,
      },
    });
  });

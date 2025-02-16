'use server';

import { z } from 'zod';
import { Industry, Stage, TeamSize } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { hasAdminPermissions } from '../helpers';

const updateStartupValidator = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  mission: z.optional(z.string()),
  location: z.string(),
  stage: z.nativeEnum(Stage),
  industry: z.nativeEnum(Industry),
  teamSize: z.optional(z.nativeEnum(TeamSize)),
  image: z.optional(z.string()),
  coverImage: z.optional(z.string()),
  skills: z.optional(z.array(z.string())),
});

export const updateStartup = authenticatedAction
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

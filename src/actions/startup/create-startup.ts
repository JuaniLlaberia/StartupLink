'use server';

import { z } from 'zod';
import { Industry, Stage, TeamSize } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const createStartupValidator = z.object({
  name: z.string().min(1, 'Must provide a startup name'),
  mission: z.string().min(25, 'Startup mission must be at least 25 char.'),
  location: z.optional(z.string()),
  stage: z.nativeEnum(Stage),
  industry: z.nativeEnum(Industry),
  teamSize: z.nativeEnum(TeamSize),
  image: z.optional(z.string()),
});

export const createStartup = authenticatedAction
  .createServerAction()
  .input(createStartupValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const { id: startupId } = await db.startup.create({
      data: { ...input, createdBy: userId },
    });

    const { id: roleId } = await db.startupRole.create({
      data: {
        name: 'Founder',
        admin: true,
        startupId,
      },
    });

    await db.startupMember.create({
      data: {
        startupId,
        userId,
        roleId,
      },
    });

    return startupId;
  });

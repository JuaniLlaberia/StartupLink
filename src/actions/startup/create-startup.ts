'use server';

import { z } from 'zod';
import { Industry, Stage, TeamSize } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const createStartupValidator = z.object({
  name: z.string().min(1, 'Must provide a startup name'),
  mission: z.string().min(25, 'Startup mission must be at least 25 char.'),
  location: z.optional(z.string()),
  website: z.optional(z.string()),
  stage: z.nativeEnum(Stage),
  industry: z.nativeEnum(Industry),
  teamSize: z.nativeEnum(TeamSize),
  image: z.optional(z.string()),
});

const createSlugFromName = (name: string) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug;
};

export const createStartup = authenticatedAction
  .createServerAction()
  .input(createStartupValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    const slug = createSlugFromName(input.name);

    const { id: startupId } = await db.startup.create({
      data: { ...input, slug, createdBy: userId },
    });

    const { id: roleId } = await db.startupRole.create({
      data: {
        name: 'Founder',
        description:
          'Default role created for the founder on startup creation.',
        active: false,
        requiresSurvey: false,
        startupId,
      },
    });

    await Promise.all([
      db.startupDesignConfig.create({
        data: {
          startupId,
          mainBackground: '#ffffff',
          secondaryBackground: '#f0f0f0',
          mainText: '#111827',
          secondaryText: '#868b94ca',
          borderRadius: 8,
        },
      }),
      db.startupMember.create({
        data: {
          startupId,
          userId,
          roleId,
        },
      }),
    ]);

    return startupId;
  });

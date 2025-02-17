'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Objective } from '@prisma/client';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';

const updateUserValidator = z.object({
  name: z.optional(z.string()),
  position: z.optional(z.string()),
  description: z.optional(z.string()),
  location: z.optional(z.string()),
  objective: z.optional(z.nativeEnum(Objective)),
  image: z.optional(z.string()),
  coverImage: z.optional(z.string()),
  urls: z.optional(z.array(z.string())),
  skills: z.optional(z.array(z.string())),
});

export const updateUser = authenticatedAction
  .createServerAction()
  .input(updateUserValidator)
  .handler(async ({ input, ctx: { userId } }) => {
    await db.user.update({ where: { id: userId }, data: { ...input } });

    revalidatePath('/profile');
  });

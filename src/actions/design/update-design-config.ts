'use server';

import { z } from 'zod';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { isStartupMember } from '@/access-data/helper';

const updateDesignConfigValidator = z.object({
  designConfigId: z.string(),
  startupId: z.string(),
  mainBackground: z.optional(z.string()),
  secondaryBackground: z.optional(z.string()),
  mainText: z.optional(z.string()),
  secondaryText: z.optional(z.string()),
  borderRadius: z.optional(z.number()),
});

export const updateDesignConfig = authenticatedAction
  .createServerAction()
  .input(updateDesignConfigValidator)
  .handler(
    async ({
      input: { startupId, designConfigId, ...data },
      ctx: { userId },
    }) => {
      await isStartupMember(startupId, userId);

      await db.startupDesignConfig.update({
        where: { id: designConfigId },
        data: {
          ...data,
        },
      });
    }
  );

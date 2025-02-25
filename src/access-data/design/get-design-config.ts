'server only';

import { db } from '@/db';

export const getDesignConfig = async ({ startupId }: { startupId: string }) => {
  const config = await db.startupDesignConfig.findFirst({
    where: { startupId },
  });
  if (!config) throw new Error('Config not found');

  return config;
};

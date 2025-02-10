'server only';

import { db } from '@/db';

type getStartupProps = {
  startupId: string;
};

export const getStartup = async ({ startupId }: getStartupProps) => {
  const startup = await db.startup.findUnique({ where: { id: startupId } });
  return startup;
};

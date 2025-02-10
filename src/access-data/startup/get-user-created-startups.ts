'server only';

import { db } from '@/db';

type getUserCreatedStartupsProps = {
  userId: string;
  page: number;
  pageSize: number;
};

export const getUserCreatedStartups = async ({
  userId,
  page,
  pageSize,
}: getUserCreatedStartupsProps) => {
  const startups = await db.startup.findMany({
    where: { createdBy: userId },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return startups;
};

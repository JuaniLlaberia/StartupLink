'server only';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';

type getAllUserStartupsProps = {
  page: number;
  pageSize: number;
};

export const getAllUserStartups = async ({
  page,
  pageSize,
}: getAllUserStartupsProps) => {
  const userId = await getAuthUser();

  const startups = await db.startupMember.findMany({
    where: { userId },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: { startup: true },
  });

  return startups;
};

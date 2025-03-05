'server only';

import { Objective, Prisma, WeeklyAvailability } from '@prisma/client';

import { db } from '@/db';

type getUsersParams = {
  searchTerm?: string;
  objective?: Objective;
  weeklyAvailability?: WeeklyAvailability;
  looking?: string;
  pageSize: number;
  page: number;
};

export async function getUsers({
  searchTerm = '',
  objective,
  weeklyAvailability,
  looking,
  page,
  pageSize,
}: getUsersParams) {
  const conditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    conditions.push({
      name: {
        contains: searchTerm,
        mode: 'insensitive' as Prisma.QueryMode,
      },
    });
  }
  if (objective) conditions.push({ objective });
  if (weeklyAvailability) conditions.push({ weeklyAvailability });
  if (looking) conditions.push({ looking: looking === 'true' ? true : false });

  const users = await db.user.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return users;
}

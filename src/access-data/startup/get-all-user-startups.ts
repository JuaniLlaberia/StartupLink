'server only';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { Prisma } from '@prisma/client';

type getAllUserStartupsProps = {
  searchTerm?: string;
  sortBy?: 'name' | 'creation';
  page: number;
  pageSize: number;
};

export const getAllUserStartups = async ({
  searchTerm,
  sortBy,
  page,
  pageSize,
}: getAllUserStartupsProps) => {
  const userId = await getAuthUser();

  const startups = await db.startupMember.findMany({
    where: {
      userId,
      startup: searchTerm
        ? {
            name: {
              contains: searchTerm,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          }
        : {},
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      startup: {
        select: {
          id: true,
          name: true,
          verified: true,
          stage: true,
          image: true,
          createdAt: true,
          user: { select: { name: true } },
        },
      },
      role: { select: { name: true, admin: true } },
    },
    orderBy: {
      startup: sortBy === 'name' ? { name: 'asc' } : { createdAt: 'desc' },
    },
  });

  return startups;
};

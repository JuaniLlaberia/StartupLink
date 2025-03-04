'server only';

import { Prisma } from '@prisma/client';

import { db } from '@/db';

type getPublicEventsParams = {
  searchTerm?: string;
  pageSize: number;
  page: number;
};

export async function getPublicEvents({
  searchTerm = '',
  page,
  pageSize,
}: getPublicEventsParams) {
  const conditions: Prisma.EventWhereInput[] = [];

  if (searchTerm) {
    conditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
      ],
    });
  }

  const events = await db.event.findMany({
    where:
      conditions.length > 0
        ? { AND: { ...conditions, visibility: 'PUBLIC' } }
        : { visibility: 'PUBLIC' },
    select: {
      id: true,
      name: true,
      description: true,
      startTime: true,
      endTime: true,
      createdAt: true,
      startup: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return events;
}

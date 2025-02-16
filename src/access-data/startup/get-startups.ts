'server only';

import { Industry, Prisma, Stage, TeamSize } from '@prisma/client';

import { db } from '@/db';

type SearchStartupsParams = {
  searchTerm?: string;
  industry?: Industry;
  stage?: Stage;
  teamSize?: TeamSize;
  verified?: string;
  pageSize: number;
  page: number;
};

export async function searchStartups({
  searchTerm = '',
  industry,
  stage,
  teamSize,
  verified,
  page,
  pageSize,
}: SearchStartupsParams) {
  const conditions: Prisma.StartupWhereInput[] = [];

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
          mission: {
            contains: searchTerm,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
      ],
    });
  }
  if (industry) conditions.push({ industry });
  if (stage) conditions.push({ stage });
  if (teamSize) conditions.push({ teamSize });
  if (verified)
    conditions.push({ verified: verified === 'true' ? true : false });

  const startups = await db.startup.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    select: {
      id: true,
      name: true,
      mission: true,
      stage: true,
      industry: true,
      location: true,
      teamSize: true,
      skills: true,
      verified: true,
      image: true,
      coverImage: true,
      createdBy: true,
      user: { select: { name: true } },
    },
    orderBy: [{ verified: 'desc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return startups;
}

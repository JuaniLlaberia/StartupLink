'server only';

import { Industry, Prisma, Stage, TeamSize } from '@prisma/client';

import { db } from '@/db';
import { getUser } from '../user/get-auth-user';

type SearchStartupsParams = {
  sortBy: 'createdAt' | 'verified' | 'upvotes';
  searchTerm?: string;
  industry?: Industry;
  stage?: Stage;
  teamSize?: TeamSize;
  verified?: string;
  pageSize: number;
  page: number;
};

export async function searchStartups({
  sortBy,
  searchTerm = '',
  industry,
  stage,
  teamSize,
  verified,
  page,
  pageSize,
}: SearchStartupsParams) {
  const user = await getUser();
  const userId = user?.id;

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
      createdAt: true,
      user: { select: { name: true } },
      _count: {
        select: { Upvote: true, StartupRole: { where: { active: true } } },
      },
      Upvote: userId
        ? {
            where: { userId },
            select: { id: true },
            take: 1,
          }
        : false,
      StartupRole: {
        where: { active: true },
        select: {
          id: true,
          name: true,
          description: true,
          requiresSurvey: true,
          surveyId: true,
        },
      },
    },
    orderBy:
      sortBy === 'upvotes'
        ? { Upvote: { _count: 'desc' } }
        : { [sortBy]: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return startups.map(startup => ({
    ...startup,
    hasUserUpvoted: userId ? startup.Upvote.length > 0 : false,
    openRoles: startup._count.StartupRole,
    roles: startup.StartupRole,
    Upvote: undefined,
    _count: undefined,
  }));
}

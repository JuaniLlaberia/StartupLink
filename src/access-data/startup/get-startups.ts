'server only';

import { Prisma } from '@prisma/client';

import { db } from '@/db';

type SearchStartupsParams = {
  userId?: string;
  searchTerm?: string;
  industry?: string;
  stage?: string;
  pageSize: number;
  page: number;
};

export async function searchStartups({
  //   userId,
  searchTerm = '',
  industry,
  stage,
  page,
  pageSize,
}: SearchStartupsParams) {
  //   let userSkills: string[] = [];
  //   if (userId) {
  //     const user = await db.user.findUnique({
  //       where: { id: userId },
  //       select: { skills: true },
  //     });
  //     userSkills = user?.skills || [];
  //   }

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

  if (industry) {
    conditions.push({ industry });
  }

  if (stage) {
    conditions.push({ stage });
  }

  const startups = await db.startup.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    orderBy: [{ verified: 'desc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  //   const startupsWithMatches = startups.map(startup => {
  //     const matchingSkills = userSkills.filter(skill =>
  //       startup.skills.includes(skill)
  //     );

  //     return {
  //       ...startup,
  //       matchingSkillsCount: matchingSkills.length,
  //       matchingSkills,
  //       skillMatchPercentage:
  //         startup.skills.length > 0
  //           ? (matchingSkills.length / startup.skills.length) * 100
  //           : 0,
  //     };
  //   });

  //   if (userSkills.length > 0) {
  //     startupsWithMatches.sort((a, b) => {
  //       // First by matching skills count
  //       if (b.matchingSkillsCount !== a.matchingSkillsCount) {
  //         return b.matchingSkillsCount - a.matchingSkillsCount;
  //       }
  //       // Then by verified status (though this should already be sorted)
  //       return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
  //     });
  //   }

  //   return startupsWithMatches;
  return startups;
}

'server only';

import { redirect } from 'next/navigation';

import { db } from '@/db';

type getStartupBySlugProps = {
  startupSlug: string;
};

export const getStartupBySlug = async ({
  startupSlug,
}: getStartupBySlugProps) => {
  const startup = await db.startup.findUnique({
    where: { slug: startupSlug },
    include: {
      StartupMember: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          role: {
            select: {
              name: true,
            },
          },
        },
      },
      StartupDesignConfig: true,
      Upvote: {
        select: { id: true },
      },
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
  });

  if (!startup) redirect('/');

  const upvotesCount = startup.Upvote.length;

  const formattedStartup = {
    ...startup,
    upvotesCount,
    members: startup.StartupMember.map(member => ({
      id: member.id,
      name: member.user.name,
      image: member.user.image,
      role: member.role.name,
    })),
    designConfig: startup.StartupDesignConfig[0] || null,
    roles: startup.StartupRole,
    StartupMember: undefined,
    Upvote: undefined,
    StartupDesignConfig: undefined,
    StartupRole: undefined,
  };

  return formattedStartup;
};

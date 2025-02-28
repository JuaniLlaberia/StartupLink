'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { isStartupMember } from '../helper';
import { db } from '@/db';

type getStartupSurveysProps = {
  startupId: string;
};

export const getStartupSurveys = async ({
  startupId,
}: getStartupSurveysProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) return redirect('/');

  const surveys = await db.survey.findMany({
    where: { startupId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      active: true,
    },
  });

  return surveys;
};

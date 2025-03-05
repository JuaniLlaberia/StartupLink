'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { isStartupMember } from '../helper';

type getApplicationsProps = {
  startupId: string;
  page: number;
  pageSize: number;
};

export const getApplications = async ({
  startupId,
  page,
  pageSize,
}: getApplicationsProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) return redirect('/');

  const applications = await db.startupApplication.findMany({
    where: { startupId },
    select: {
      id: true,
      createdAt: true,
      startupId: true,
      surveyResponse: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          position: true,
        },
      },
      role: { select: { name: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });

  return applications;
};

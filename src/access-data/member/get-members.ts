'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { isStartupMember } from '../helper';

type getMembersProps = {
  startupId: string;
  page: number;
  pageSize: number;
};

export const getMembers = async ({
  startupId,
  page,
  pageSize,
}: getMembersProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) return redirect('/');

  const members = await db.startupMember.findMany({
    where: { startupId },
    select: {
      id: true,
      createdAt: true,
      user: { select: { name: true, image: true, email: true } },
      role: { select: { name: true, admin: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });

  return members;
};

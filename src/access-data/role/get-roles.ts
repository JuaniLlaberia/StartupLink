'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { isStartupMember } from '../helper';

type getRolesProps = {
  startupId: string;
  page: number;
  pageSize: number;
};

export const getRoles = async ({
  startupId,
  page,
  pageSize,
}: getRolesProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) return redirect('/');

  const roles = await db.startupRole.findMany({
    where: { startupId },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });

  return roles;
};

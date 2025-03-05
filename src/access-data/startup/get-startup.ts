'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { isStartupMember } from '../helper';

type getStartupProps = {
  startupId: string;
};

export const getStartup = async ({ startupId }: getStartupProps) => {
  const userId = await getAuthUser();
  const isMember = await isStartupMember(startupId, userId);

  if (!isMember) redirect('/startups');

  const startup = await db.startup.findUnique({ where: { id: startupId } });

  if (!startup) redirect('/my-startups');

  return startup;
};

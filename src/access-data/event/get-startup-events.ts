'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { isStartupMember } from '../helper';

type getStartupEventsProps = {
  startupId: string;
};

export const getStartupEvents = async ({
  startupId,
}: getStartupEventsProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) return redirect('/');

  const events = await db.event.findMany({
    where: { startupId },
    orderBy: { createdAt: 'desc' },
  });

  return events;
};

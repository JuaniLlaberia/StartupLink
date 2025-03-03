'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { isStartupMember } from '../helper';

type getAtendeessProps = {
  eventId: string;
  startupId: string;
};

export const getAtendees = async ({
  eventId,
  startupId,
}: getAtendeessProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) redirect('/');

  const atendees = await db.eventAttendee.findMany({
    where: {
      eventId,
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });

  return atendees;
};

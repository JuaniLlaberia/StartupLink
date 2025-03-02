'server only';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';

export const getUserEvents = async () => {
  const userId = await getAuthUser();

  const events = await db.event.findMany({
    where: {
      EventAttendee: {
        some: {
          userId,
        },
      },
    },
    include: {
      startup: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return events;
};

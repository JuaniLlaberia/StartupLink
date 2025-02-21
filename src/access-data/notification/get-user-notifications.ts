'server only';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';

export const getUserNotifications = async ({
  page,
  pageSize,
}: {
  pageSize: number;
  page: number;
}) => {
  const userId = await getAuthUser();

  const notifications = await db.notification.findMany({
    where: {
      receiverId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return notifications;
};

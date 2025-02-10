import { db } from '@/db';

export const hasAdminPermissions = async (
  startupId: string,
  userId: string
) => {
  const permissions = await db.startupMember.findFirst({
    where: { startupId, userId },
    select: {
      role: {
        select: {
          admin: true,
        },
      },
    },
  });

  if (!permissions?.role)
    throw new Error('You have no permission to perform this action');
};

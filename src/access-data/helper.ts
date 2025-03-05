import { db } from '@/db';

export const isStartupMember = async (startupId: string, userId: string) => {
  const isMember = await db.startupMember.findUnique({
    where: { startupId_userId: { startupId, userId } },
    select: { id: true },
  });

  return Boolean(isMember);
};

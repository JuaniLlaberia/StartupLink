'server only';

import { db } from '@/db';

type getUserProps = { userId: string };

export const getUser = async ({ userId }: getUserProps) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  return user;
};

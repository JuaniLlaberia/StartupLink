'server only';

import { auth } from '@/auth';
import { db } from '@/db';

export const getUser = async () => {
  const session = await auth();
  if (!session || !session.user?.email) return null;

  const user = await db.user.findUnique({
    where: { email: session?.user?.email },
  });
  if (!user) throw new Error('User not found');

  return user;
};

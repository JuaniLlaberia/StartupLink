'server only';

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/db';

export const getUser = async () => {
  const session = await auth();
  if (!session || !session.user?.email) redirect('/');

  const user = await db.user.findUnique({
    where: { email: session?.user?.email },
  });
  if (!user) throw new Error('User not found');

  return user;
};

'use server';

import { authenticatedAction } from '@/lib/safe-actions';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export const getAuthUser = authenticatedAction
  .createServerAction()

  .handler(async ({ ctx: { userId } }) => {
    const user = db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        image: true,
      },
    });
    if (!user) return redirect('/');

    return user;
  });

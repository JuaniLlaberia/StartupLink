'use server';

import { signIn } from '@/auth';

export const signInAction = async (
  provider: 'google' | 'github' | 'gitlab'
) => {
  await signIn(provider);
};

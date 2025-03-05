import { getAuthUser } from '@/actions/auth';
import { createServerActionProcedure } from 'zsa';

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const userId = await getAuthUser();

    return { userId };
  }
);

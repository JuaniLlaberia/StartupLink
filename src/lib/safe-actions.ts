import { createServerActionProcedure } from 'zsa';

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    return '';
  }
);

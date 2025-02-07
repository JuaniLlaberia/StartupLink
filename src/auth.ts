import Github from 'next-auth/providers/github';
import Gitlab from 'next-auth/providers/gitlab';
import Google from 'next-auth/providers/google';

import NextAuth from 'next-auth';
import { db } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Gitlab,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      try {
        let existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          existingUser = await db.user.create({
            data: {
              email: user.email,
              name: user.name,
              // @ts-expect-error Solve why it throws type error on image if it is in the schema
              image: user.image ?? undefined,
            },
          });
        }
      } catch {
        console.error('Failed to create user');
        return false;
      }

      return true;
    },
  },
});

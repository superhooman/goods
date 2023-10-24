import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { eq } from 'drizzle-orm';

import { env } from '@src/env.mjs';
import { db } from '@src/server/db';
import { mysqlTable, users } from '@src/server/db/schema';

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
    callbacks: {
        session: async ({ session, user }) => {
            const [dbUser] = await db.select().from(users).where(eq(users.id, user.id));
      
            if (!dbUser) {
                throw new Error(`User not found: ${user.id}`);
            };

            return ({
                ...session,
                user: {
                    ...session.user,
                    ...dbUser,
                },
            });
        },
    },
    adapter: DrizzleAdapter(db, mysqlTable),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    ],
};

export const { handlers, auth } = NextAuth(authOptions);

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => auth();

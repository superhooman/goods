import { adminRouter } from '@src/server/api/routers/admin';
import { createTRPCRouter } from '@src/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { FOLDERS } from '@src/constants/s3';
import { itemSchema } from '@src/schemas/item';
import { s3 } from '@src/server/s3';
import { env } from '@src/env.mjs';
import { items, users } from '@src/server/db/schema';
import { UserRole } from '@src/types/user';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const adminRouter = createTRPCRouter({
    validate: protectedProcedure
        .input(z.object({ secret: z.string() }))
        .mutation(async ({ ctx, input: { secret } }) => {
            const { user } = ctx.session;

            if (secret === env.ADMIN_SECRET) {
                await ctx.db.update(users).set({ role: UserRole.ADMIN }).where(eq(users.id, user.id));

                return { success: true };
            }

            return { success: false };
        }),
    addItem: protectedProcedure
        .input(itemSchema)
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx.session;

            // const item = await ctx.prisma.item.create({
            //   data: {
            //     ...input,
            //     user: { connect: { id: user.id } },
            //   },
            // });

            const item = await ctx.db.insert(items).values({
                ...input,
                createdById: user.id,
            });

            console.log({ item });

            return item;
        }),
    editItem: protectedProcedure
        .input(z.object({
            id: z.number(),
            data: itemSchema,
        }))
        .mutation(async ({ ctx, input: { id, data } }) => {
            // const item = await ctx.prisma.item.update({
            //   where: { id },
            //   data: {
            //     ...data,
            //   },
            // });

            const item = await ctx.db.update(items).set(data).where(eq(items.id, id));

            return item;
        }),
    removeItem: protectedProcedure
        .input(z.object({
            id: z.number(),
        }))
        .mutation(async ({ ctx, input: { id } }) => {
            await ctx.db.delete(items).where(eq(items.id, id));

            await s3.send(new DeleteObjectCommand({
                Bucket: env.S3_BUCKET,
                Key: `${FOLDERS.ITEMS}/${id}`,
            }));

            return true;
        }),
    allItems: protectedProcedure
        .query(async ({ ctx }) => {
            const list = await ctx.db.select().from(items);

            return list;
        }),
});

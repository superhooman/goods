import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { FOLDERS } from "@src/constants/s3";
import { env } from "@src/env/server.mjs";
import { itemSchema } from "@src/schemas/item";
import { s3 } from "@src/server/s3";
import { z } from "zod";

import { createTRPCRouter, adminProcedure, protectedProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  validate: protectedProcedure
    .input(z.object({ secret: z.string() }))
    .mutation(async ({ ctx, input: { secret } }) => {
      const { user } = ctx.session;

      if (secret === env.ADMIN_SECRET) {
        await ctx.prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN' },
        });

        return { success: true };
      }

      return { success: false };
    }),
  addItem: adminProcedure
    .input(itemSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;

      const item = await ctx.prisma.item.create({
        data: {
          ...input,
          user: { connect: { id: user.id } },
        },
      });

      return item;
    }),
  editItem: adminProcedure
    .input(z.object({
      id: z.string(),
      data: itemSchema,
    }))
    .mutation(async ({ ctx, input: { id, data } }) => {
      const item = await ctx.prisma.item.update({
        where: { id },
        data: {
          ...data,
        },
      });

      return item;
    }),
  removeItem: adminProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input: { id } }) => {
      const item = await ctx.prisma.item.delete({
        where: { id },
      });

      await s3.send(new DeleteObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: `${FOLDERS.ITEMS}/${item.id}`,
      }));

      return true;
    }),
  allItems: adminProcedure
    .query(async ({ ctx }) => {
      const items = await ctx.prisma.item.findMany();

      return items;
    }),
});

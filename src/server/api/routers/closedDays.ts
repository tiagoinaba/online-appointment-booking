import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { now } from "@/utils/constants";
import { sub } from "date-fns";

export const closedDaysRouter = createTRPCRouter({
  getClosedDays: publicProcedure
    .input(z.object({ adminId: z.nullable(z.string()) }))
    .query(async ({ ctx, input: { adminId } }) => {
      if (adminId) {
        const deleted = await ctx.prisma.closedDays.deleteMany({
          where: {
            dateClosed: {
              lt: sub(now, { months: 1 }),
            },
          },
        });
        const data = await ctx.prisma.closedDays.findMany({
          where: { adminId: adminId },
        });
        return data;
      } else {
        return await ctx.prisma.closedDays.findMany();
      }
    }),
  toggleClosedDay: adminProcedure
    .input(z.object({ dateClosed: z.date(), adminId: z.string() }))
    .mutation(async ({ ctx, input: { dateClosed, adminId } }) => {
      dateClosed.setHours(0, 0, 0, 0);
      const dateExists = await ctx.prisma.closedDays.findFirst({
        where: { AND: [{ dateClosed: dateClosed }, { adminId: adminId }] },
      });
      if (!dateExists) {
        return await ctx.prisma.closedDays.create({
          data: { dateClosed, adminId },
        });
      } else {
        return await ctx.prisma.closedDays.delete({
          where: {
            id: dateExists.id,
          },
        });
      }
    }),
});

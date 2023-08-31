import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { isBefore } from "date-fns";
import { NextResponse } from "next/server";

export const dayRouter = createTRPCRouter({
  getDay: publicProcedure
    .input(z.object({ adminId: z.string() }))
    .query(async ({ ctx, input: { adminId } }) => {
      return await ctx.prisma.day.findMany({ where: { adminId } });
    }),
  createDay: adminProcedure
    .input(
      z.object({
        adminId: z.string(),
        open: z.boolean(),
        weekDay: z.number(),
        openingHour: z.date(),
        closingHour: z.date(),
        interval: z.date(),
      })
    )
    .mutation(
      async ({
        ctx,
        input: { adminId, closingHour, interval, openingHour, weekDay, open },
      }) => {
        if (isBefore(openingHour, closingHour)) {
          const day = await ctx.prisma.day.upsert({
            create: {
              weekDay,
              adminId,
              closingHour,
              openingHour,
              interval,
              open,
            },
            update: {
              closingHour,
              openingHour,
              interval,
              open,
            },
            where: {
              weekDay_adminId: {
                adminId,
                weekDay,
              },
            },
          });

          return day;
        } else {
          throw new Error(
            "Horário de abertura deve ser antes do horário de fechamento"
          );
        }
      }
    ),
  deleteDay: adminProcedure
    .input(z.object({ adminId: z.string(), weekDay: z.number() }))
    .mutation(async ({ ctx, input: { adminId, weekDay } }) => {
      const deletedDay = await ctx.prisma.day.deleteMany({
        where: {
          AND: [{ adminId }, { weekDay }],
        },
      });

      return deletedDay;
    }),
});

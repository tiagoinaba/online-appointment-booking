import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";
import { now } from "@/utils/constants";
import { sub } from "date-fns";

export const reservationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    await ctx.prisma.reservation.deleteMany({
      where: {
        dateTime: {
          lt: sub(now, { months: 1 }),
        },
      },
    });
    const reservations = await ctx.prisma.reservation.findMany();
    return reservations;
  }),

  getByDate: publicProcedure
    .input(z.object({ date: z.nullable(z.date()) }))
    .query(({ ctx, input }) => {
      if (input.date) {
        input.date.setHours(0, 0, 0, 0);
        return ctx.prisma.reservation.findMany({
          where: {
            justDate: input.date,
          },
        });
      } else return ctx.prisma.reservation.findMany();
    }),

  createReservation: publicProcedure
    .input(
      z.object({
        date: z.date(),
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const justDate = new Date(input.date);
      justDate.setHours(0, 0, 0, 0);

      const reservation = await ctx.prisma.reservation.findFirst({
        where: { dateTime: input.date },
      });

      if (!reservation) {
        await ctx.prisma.reservation.create({
          data: {
            name: input.name,
            email: input.email,
            justDate,
            dateTime: input.date,
          },
        });

        return "Horário reservado com sucesso!";
      }

      return "Algo deu errado. Tente novamente";
    }),

  deleteReservation: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.prisma.reservation.delete({
        where: {
          id: id,
        },
      });
    }),
});

import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";
import { now } from "@/utils/constants";
import { sub } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

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
        paymentId: z.nullable(z.string()),
        adminId: z.string(),
        serviceId: z.nullable(z.string()),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const justDate = new Date(input.date);
      justDate.setHours(0, 0, 0, 0);

      if (input.serviceId) {
        const reservation = await ctx.prisma.reservation.findFirst({
          where: {
            AND: [{ dateTime: input.date }, { serviceId: input.serviceId }],
          },
        });

        if (!reservation) {
          await ctx.prisma.reservation.create({
            data: {
              paymentIdMP: input.paymentId,
              name: input.name,
              email: input.email,
              adminId: input.adminId,
              serviceId: input.serviceId,
              justDate,
              dateTime: input.date,
            },
          });

          return "Horário reservado com sucesso!";
        }

        console.log(reservation);
      } else {
        const reservation = await ctx.prisma.reservation.findFirst({
          where: {
            AND: [
              { dateTime: input.date },
              { adminId: input.adminId },
              { serviceId: null },
            ],
          },
        });

        if (!reservation) {
          await ctx.prisma.reservation.create({
            data: {
              paymentIdMP: input.paymentId,
              name: input.name,
              email: input.email,
              adminId: input.adminId,
              serviceId: null,
              justDate,
              dateTime: input.date,
            },
          });

          return "Horário reservado com sucesso!";
        }
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
  getByDateAdmin: publicProcedure
    .input(z.object({ date: z.nullable(z.date()), adminId: z.string() }))
    .query(async ({ ctx, input }) => {
      const reservationSelect = {
        admin: true,
        adminId: true,
        createdAt: true,
        dateTime: true,
        email: true,
        id: true,
        justDate: true,
        name: true,
        service: {
          select: {
            name: true,
          },
        },
        paymentIdMP: true,
        serviceId: true,
      } satisfies Prisma.ReservationSelect;

      type ReservationPayload = Prisma.ReservationGetPayload<{
        select: typeof reservationSelect;
      }>;
      if (input.date) {
        input.date.setHours(0, 0, 0, 0);
        const data = await ctx.prisma.reservation.findMany({
          where: {
            AND: [
              { justDate: input.date },
              { adminId: input.adminId },
              { serviceId: null },
            ],
          },
          select: reservationSelect,
          orderBy: {
            dateTime: "asc",
          },
        });

        return data;
      }

      const data = await ctx.prisma.reservation.findMany({
        where: {
          adminId: input.adminId,
        },
        select: reservationSelect,
      });

      return data;
    }),
  getByDateService: publicProcedure
    .input(
      z.object({
        date: z.nullable(z.date()),
        serviceId: z.nullable(z.string()),
      })
    )
    .query(async ({ ctx, input: { date, serviceId } }) => {
      console.log(serviceId);
      if (serviceId) {
        if (date) {
          date.setHours(0, 0, 0, 0);
          const data = await ctx.prisma.reservation.findMany({
            where: { AND: [{ serviceId }, { justDate: date }] },
          });

          return data;
        }
      }
      const data = await ctx.prisma.reservation.findMany({
        where: { serviceId },
      });

      return data;
    }),
});

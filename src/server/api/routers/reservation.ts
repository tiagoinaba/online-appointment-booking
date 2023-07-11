import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";

export const reservationRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.reservation.findMany();
    }),

    createReservation: publicProcedure
        .input(z.object({
            date: z.date()
        }))
        .mutation(async ({ ctx, input }) => {
            const reservation = await ctx.prisma.reservation.findFirst({ where: { date: input.date } });

            if (!reservation) {
                await ctx.prisma.reservation.create({ data: { name: 'Test', date: input.date, } });

                return new NextResponse('Horário reservado com sucesso!');
            }

            throw new TRPCError({ code: "BAD_REQUEST", message: "Horário indisponível." });
        })
})
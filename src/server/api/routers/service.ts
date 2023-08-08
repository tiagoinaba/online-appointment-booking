import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { ServiceForm } from "@/pages/admin/dashboard/services";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const serviceRouter = createTRPCRouter({
  createService: adminProcedure
    .input(
      z.object({
        data: ServiceForm,
        adminId: z.string(),
        imageUrl: z.nullable(z.string()),
      })
    )
    .mutation(
      async ({
        ctx,
        input: {
          adminId,
          data: { name },
          imageUrl,
        },
      }) => {
        try {
          await ctx.prisma.service.create({
            data: {
              name,
              adminId,
              imageUrl,
            },
          });
        } catch (err) {
          if (
            err instanceof PrismaClientKnownRequestError &&
            err.code === "P2002"
          ) {
            throw new Error("Serviço com este nome já existe.");
          }
        }
      }
    ),
  getServicesByAdmin: publicProcedure
    .input(z.object({ adminId: z.string() }))
    .query(async ({ ctx, input: { adminId } }) => {
      return await ctx.prisma.service.findMany({
        where: {
          adminId,
        },
      });
    }),
});

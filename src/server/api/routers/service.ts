import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { ServiceForm } from "@/pages/admin/dashboard/services";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { utapi } from "uploadthing/server";
import { ServiceEditForm } from "@/components/ServiceCard";

export const serviceRouter = createTRPCRouter({
  createService: adminProcedure
    .input(
      z.object({
        data: ServiceForm,
        adminId: z.string(),
        imageUrl: z.nullable(z.string()),
        imageKey: z.nullable(z.string()),
      })
    )
    .mutation(
      async ({
        ctx,
        input: {
          adminId,
          data: { name },
          imageUrl,
          imageKey,
        },
      }) => {
        try {
          await ctx.prisma.service.create({
            data: {
              name,
              adminId,
              imageUrl,
              imageKey,
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
  getById: publicProcedure
    .input(z.object({ id: z.nullable(z.string()) }))
    .mutation(async ({ ctx, input: { id } }) => {
      if (id)
        return await ctx.prisma.service.findFirst({
          where: {
            id: id,
          },
        });

      return null;
    }),
  getServicesByAdmin: publicProcedure
    .input(z.object({ adminId: z.string() }))
    .query(async ({ ctx, input: { adminId } }) => {
      return await ctx.prisma.service.findMany({
        where: {
          adminId,
        },
      });
    }),
  deleteService: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const service = await ctx.prisma.service.delete({
        where: {
          id,
        },
      });
      if (service.imageKey) {
        await utapi.deleteFiles(service.imageKey);
      }
    }),
  updateService: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: ServiceEditForm,
        imageUrl: z.nullable(z.string()),
        imageKey: z.nullable(z.string()),
      })
    )
    .mutation(async ({ ctx, input: { id, data, imageKey, imageUrl } }) => {
      const oldService = await ctx.prisma.service.findUnique({
        where: {
          id,
        },
      });
      await ctx.prisma.service.update({
        where: {
          id,
        },
        data: {
          name: data.name.length > 0 ? data.name : undefined,
          imageKey: imageKey ?? undefined,
          imageUrl: imageUrl ?? undefined,
        },
      });
      if (oldService?.imageKey && imageKey && imageUrl) {
        await utapi.deleteFiles(oldService.imageKey);
      }
    }),
  removeImage: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const oldService = await ctx.prisma.service.findUnique({
        where: {
          id,
        },
      });
      if (oldService && oldService.imageKey)
        await utapi.deleteFiles(oldService.imageKey);
      await ctx.prisma.service.update({
        where: {
          id,
        },
        data: {
          imageKey: null,
          imageUrl: null,
        },
      });
    }),
});

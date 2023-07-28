import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import cookie from "cookie";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const dbAdmin = await ctx.prisma.admin.findFirst({ where: { email } });

      const result = await bcrypt.compare(password, dbAdmin?.password!);

      if (result) {
        const { res } = ctx;
        // user is logged in successfully
        // return a JWT cookie to the user
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("8h")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        res?.setHeader("Set-Cookie", [
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: env.NODE_ENV === "production",
          }),
          cookie.serialize("admin-name", dbAdmin?.name!, {
            httpOnly: true,
            path: "/",
            secure: env.NODE_ENV === "production",
          }),
        ]);

        return;
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password.",
      });
    }),

  createAdmin: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .regex(
            /[a-zA-Z0-9 ]+/g,
            "Somente letras, números e espaços permitidos."
          ),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const nameCheck = await ctx.prisma.admin.findFirst({
        where: { name: input.name },
      });
      const emailCheck = await ctx.prisma.admin.findFirst({
        where: { email: input.email },
      });

      if (nameCheck) {
        throw new Error("Name already exists");
      }

      if (emailCheck) {
        throw new Error("Email already exists");
      }

      bcrypt.hash(input.password, 10, async (err, hash) => {
        if (hash) {
          const route = input.name.trim().toLowerCase().split(" ").join("-");
          const admin = await ctx.prisma.admin.create({
            data: {
              name: input.name.trim(),
              route,
              email: input.email,
              password: hash,
            },
          });

          await ctx.prisma.adminConfig.create({
            data: {
              adminId: admin.id,
            },
          });
        }
        if (err) {
          console.log(err);
        }
      });
    }),

  updatePreferences: adminProcedure
    .input(
      z.object({
        adminId: z.string(),
        requirePayment: z.boolean(),
        paymentValue: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { requirePayment, paymentValue } = input;

      await ctx.prisma.adminConfig.update({
        where: {
          adminId: input.adminId,
        },
        data: {
          requirePayment,
          paymentValue,
        },
      });
    }),
});

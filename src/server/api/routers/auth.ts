import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import cookie from 'cookie';

export const authRouter = createTRPCRouter({
    login: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const { email, password } = input;
        if (email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD) {
            const { res } = ctx
            // user is logged in successfully
            // return a JWT cookie to the user
            const token = await new SignJWT({})
                .setProtectedHeader({ alg: 'HS256' })
                .setJti(nanoid())
                .setIssuedAt()
                .setExpirationTime('8h')
                .sign(new TextEncoder().encode(getJwtSecretKey()));

            res?.setHeader('Set-Cookie', cookie.serialize('user-token', token, {
                httpOnly: true,
                path: '/',
                secure: env.NODE_ENV === 'production',
            }))

            return;
        }
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
        })
    })
})
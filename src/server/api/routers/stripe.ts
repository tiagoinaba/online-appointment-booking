import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import Stripe from "stripe";
import { format } from "date-fns";

const stripe = new Stripe(env.STRIPE_SK, { apiVersion: "2023-08-16" });

export const stripeRouter = createTRPCRouter({
  createCheckout: publicProcedure
    .input(
      z.object({
        date: z.date(),
        adminId: z.string(),
        paymentValue: z.number(),
        serviceId: z.nullable(z.string()),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const session = await stripe.checkout.sessions.create({
          success_url: `${
            ctx.req?.headers.origin ?? "http://localhost:3000"
          }/callback`,
          cancel_url: `${
            ctx.req?.headers.origin ?? "http://localhost:3000"
          }/callback`,
          line_items: [
            {
              price_data: {
                currency: "brl",
                product_data: {
                  name: `Reserva - ${format(
                    input.date,
                    "dd/MM/yyyy '->' HH:mm"
                  )}`,
                  metadata: {
                    date: input.date.toISOString(),
                  },
                },

                unit_amount: input.paymentValue * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          payment_intent_data: {
            metadata: {
              date: input.date.toISOString(),
              adminId: input.adminId,
              serviceId: input.serviceId,
              name: `${input.firstName} ${input.lastName}`,
              phoneNumber: input.phoneNumber,
              email: input.email,
            },
          },
        });
        return session;
      } catch (e) {
        console.error(e);
      }
    }),
});

import axios from "axios";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env.mjs";
import { z } from "zod";
import { nanoid } from "nanoid";

export const mercadopagoRouter = createTRPCRouter({
  createPreference: publicProcedure
    .input(
      z.object({
        date: z.date(),
        adminId: z.string(),
        paymentValue: z.number(),
        serviceId: z.nullable(z.string()),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { data } = await axios.post(
          "https://api.mercadopago.com/checkout/preferences",
          {
            items: [
              {
                id: nanoid(),
                title: "reserva",
                description: {
                  date: input.date.toISOString(),
                  adminId: input.adminId,
                  serviceId: input.serviceId,
                  name: input.firstName.concat(" ", input.lastName),
                  email: input.email,
                },
                quantity: 1,
                unit_price: input.paymentValue,
              },
            ],
            payer: {
              name: input.firstName,
              surname: input.lastName,
            },
            notification_url:
              "https://7847-2804-14c-d080-a66d-38e0-1e44-4f84-763a.ngrok-free.app/api/mercadopago",
            auto_return: "approved",
            back_urls: {
              success:
                "https://7847-2804-14c-d080-a66d-38e0-1e44-4f84-763a.ngrok-free.app/callback",
              pending:
                "https://7847-2804-14c-d080-a66d-38e0-1e44-4f84-763a.ngrok-free.app/callback",
              failure:
                "https://7847-2804-14c-d080-a66d-38e0-1e44-4f84-763a.ngrok-free.app/callback",
            },
          },
          {
            headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
          }
        );
        console.log(data.id);
        return data.id;
      } catch (err) {
        console.error(err);
        return err;
      }
    }),

  getPayment: publicProcedure
    .input(z.object({ paymentId: z.string() }))
    .mutation(async ({ input }) => {
      const { data } = await axios.get(
        `https://api.mercadopago.com/v1/payments/${input.paymentId}`,
        {
          headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
        }
      );
      return data;
    }),

  createReimbursement: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { data } = await axios.post(
        `https://api.mercadopago.com/v1/payments/${input.id}/refunds`,
        {},
        {
          headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
        }
      );

      return data;
    }),
});

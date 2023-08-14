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
                },
                quantity: 1,
                unit_price: input.paymentValue,
              },
            ],
            auto_return: "approved",
            back_urls: {
              success:
                "https://30bd-2804-431-cffa-b62b-cdbd-b540-c840-6103.ngrok-free.app/callback",
              pending:
                "https://30bd-2804-431-cffa-b62b-cdbd-b540-c840-6103.ngrok-free.app/callback",
              failure:
                "https://30bd-2804-431-cffa-b62b-cdbd-b540-c840-6103.ngrok-free.app/callback",
            },
            notification_url:
              "https://30bd-2804-431-cffa-b62b-cdbd-b540-c840-6103.ngrok-free.app/api/mercadopago",
          },
          {
            headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
          }
        );
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
        `https://api.mercadopago.com/v1/payments/${id}/refunds`,
        {},
        {
          headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
        }
      );

      return data;
    }),
});

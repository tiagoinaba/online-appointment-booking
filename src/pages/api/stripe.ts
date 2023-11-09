/* eslint-disable */

/// <reference types="stripe-event-types" />
import { STRIPE_PK } from "@/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { prisma } from "@/server/db";

const stripe = new Stripe(STRIPE_PK, { apiVersion: "2023-08-16" });

const endpointSecret =
  "whsec_5863ae488d90c94c3941b7d60913f9f471a71fdc1cde910eaa036bb855f2bd7b";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    let event;
    if (sig) {
      try {
        event = stripe.webhooks.constructEvent(
          buf,
          sig,
          endpointSecret
        ) as Stripe.DiscriminatedEvent;

        console.log(event);

        if (event.type === "charge.succeeded") {
          const metadata = event.data.object.metadata as {
            date: string;
            adminId: string;
            serviceId: string | null;
            name: string;
            phoneNumber: string;
            email: string;
          };
          console.log(metadata);
          const dateTime = new Date(metadata.date);
          const justDate = new Date(metadata.date);
          justDate.setHours(0, 0, 0, 0);
          await prisma.reservation.create({
            data: {
              dateTime,
              email: metadata.email,
              justDate,
              name: metadata.name,
              adminId: metadata.adminId,
              phoneNumber: metadata.phoneNumber,
              serviceId: metadata.serviceId,
              paymentIdMP: event.data.object.id,
              paymentStatus: "Pago",
            },
          });
        }

        res.status(200).json("ok");
      } catch (err: any) {
        console.log("erro: " + err.message);
        res.status(400);
      }
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

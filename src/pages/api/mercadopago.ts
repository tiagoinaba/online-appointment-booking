import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type CustomRequest = NextApiRequest & {
  id: string;
};

export default async function handler(
  req: CustomRequest,
  res: NextApiResponse
) {
  // if (req.body.action === "payment.created") console.log("payment created");
  // if (req.body.action === "payment.updated") {
  console.log(req.body);
  try {
    if (req.body.action) {
      const paymentId = req.body.data.id;
      const { data } = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        { headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` } }
      );
      const item = JSON.parse(data.additional_info.items[0].description);
      const dateTime = new Date(item.date);
      const justDate = new Date(item.date);
      justDate.setHours(0, 0, 0, 0);
      if (data.status === "pending") {
        await prisma.reservation.upsert({
          where: {
            paymentIdMP: paymentId,
          },
          create: {
            dateTime,
            adminId: item.adminId,
            serviceId: item.serviceId,
            justDate,
            name: item.name,
            email: item.email,
            paymentIdMP: paymentId,
            paymentStatus: "pending",
          },
          update: {
            paymentStatus: "pending",
          },
        });
      }
      if (data.status === "approved") {
        await prisma.reservation.upsert({
          where: {
            paymentIdMP: paymentId,
          },
          create: {
            dateTime,
            adminId: item.adminId,
            serviceId: item.serviceId,
            justDate,
            name: item.name,
            email: item.email,
            paymentIdMP: paymentId,
            paymentStatus: "approved",
          },
          update: {
            paymentStatus: "approved",
          },
        });
      }
    }
    // }
    res.status(200).json("ok");
  } catch (err) {
    console.log("[MP_Error]", err);
  }
}

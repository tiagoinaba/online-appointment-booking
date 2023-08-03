import { createTRPCRouter } from "@/server/api/trpc";
import { reservationRouter } from "./routers/reservation";
import { mercadopagoRouter } from "./routers/mercadopago";
import { authRouter } from "./routers/auth";
import { serviceRouter } from "./routers/service";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  reservation: reservationRouter,
  mercadopago: mercadopagoRouter,
  auth: authRouter,
  service: serviceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

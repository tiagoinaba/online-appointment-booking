import { Prisma } from "@prisma/client";

declare global {
  var id: string;
}

export type DateType = {
  justDate: Date | null;
  dateTime: Date | null;
};

export type Inputs = {
  name: string;
  email: string;
};

export type AdminInfo = {
  id: string;
  requirePayment: boolean;
  name: string;
  route: string;
};

const reservationWithService = Prisma.validator<Prisma.ReservationArgs>()({
  include: { service: true },
});

type ReservationWithService = Prisma.ReservationGetPayload<
  typeof reservationWithService
>;

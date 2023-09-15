import AdminBackButton from "@/components/AdminBackButton";
import { Heading } from "@/components/Heading";
import NotFound from "@/components/NotFound";
import DataTable, {
  ReservationTable,
} from "@/components/reservations/DataTable";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { ReservationWithService } from "@/utils/types";
import { Button } from "@mui/material";
import { Prisma, Reservation, Service } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Reservations({
  reservations,
  services,
}: {
  reservations: Prisma.ReservationGetPayload<{ include: { service: true } }>[];
  services: Service[];
}) {
  const [formattedRes, setFormattedRes] = useState<ReservationTable[]>([]);

  useEffect(() => {
    if (reservations && reservations.length > 0) {
      setFormattedRes(
        reservations?.map((res) => ({
          id: res.id,
          name: res.name,
          email: res.email,
          date: res.dateTime,
          service: res.service?.name ? res.service?.name : null,
          paymentIdMP: res.paymentIdMP,
          paymentStatus: res.paymentStatus,
        }))
      );
    }
  }, [reservations]);

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center pt-32">
        <div className="flex flex-col">
          <Heading className="ml-8">Reservas</Heading>
          {formattedRes && (
            <div className="container mx-auto py-10">
              <DataTable services={services} data={formattedRes} />
            </div>
          )}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const adminName = req.cookies["admin-name"];

    if (adminName) {
      const admin = await prisma.admin.findUnique({
        where: {
          name: adminName,
        },
        select: {
          id: true,
        },
      });

      return { props: { adminId: admin?.id ? admin.id : null } };
    }

    throw new Error("Not found");
  } catch (err) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};

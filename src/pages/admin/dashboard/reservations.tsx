import AdminBackButton from "@/components/AdminBackButton";
import NotFound from "@/components/NotFound";
import DataTable, {
  ReservationTable,
} from "@/components/reservations/DataTable";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { ReservationWithService } from "@/utils/types";
import { Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function reservations({
  adminId,
  notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: reservations } = api.reservation.getByDateAdmin.useQuery({
    date: null,
    adminId: adminId ? adminId : "error",
  });
  const { data: services } = api.service.getServicesByAdmin.useQuery({
    adminId: adminId ?? "error",
  });
  const router = useRouter();
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
        }))
      );
    }
  }, [reservations]);

  return (
    <>
      <Head>
        <title>Reservas - Admin</title>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center pt-32">
        <AdminBackButton />
        {adminId ? (
          <div>
            <h1 className="text-center text-2xl font-bold">Reservas</h1>
            {formattedRes && (
              <div className="container mx-auto py-10">
                <DataTable services={services} data={formattedRes} />
              </div>
            )}
          </div>
        ) : (
          <NotFound />
        )}
      </main>
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

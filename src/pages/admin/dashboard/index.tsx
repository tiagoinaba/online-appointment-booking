import { SideNav } from "@/components/admin/SideNav";
import { useActiveTabStore } from "@/hooks/useActiveTab";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { type Prisma } from "@prisma/client";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { z } from "zod";
import Calendario from "./calendario";
import Financeiro from "./financeiro";
import Options from "./options";
import Reservations from "./reservations";
import Services from "./services";

export default function Index({
  admin,
  data,
  resCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const active = useActiveTabStore((state) => state.active);

  const { data: fullAdmin } = api.auth.getFullAdmin.useQuery({
    id: admin?.id ?? "not found",
  });

  if (!admin) {
    console.log("admin not found");
    return null;
  }
  if (!fullAdmin) {
    console.log(fullAdmin);
    return null;
  }
  if (!data) {
    console.log("data not found");
    return null;
  }

  return (
    <div className="relative flex">
      <Head>
        <title>Admin - Dashboard</title>
      </Head>
      <SideNav />
      <div className="ml-36 flex-1">
        {active === "Opções" ? (
          <Options admin={fullAdmin} />
        ) : active === "Financeiro" ? (
          <Financeiro resCount={resCount} chartData={data} admin={fullAdmin} />
        ) : active === "Datas e horários" ? (
          <Calendario admin={fullAdmin} />
        ) : active === "Serviços" ? (
          <Services admin={fullAdmin} />
        ) : (
          active === "Reservas" && (
            <Reservations
              adminId={admin.id}
              reservations={fullAdmin.Reservation}
              services={fullAdmin.Service}
            />
          )
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const adminCookie = req.cookies["admin-name"];
    if (adminCookie) {
      let admin = await prisma.admin.findUnique({
        where: {
          name: adminCookie,
        },
        include: {
          AdminConfig: true,
          ClosedDays: true,
          Day: true,
          Reservation: true,
          Service: { include: { reservations: true } },
        },
      });

      const resCount = await prisma.reservation.count({
        where: {
          admin: {
            name: adminCookie,
          },
        },
      });

      if (admin) {
        let reservationsData = admin.Reservation;

        // eslint-disable-next-line
        reservationsData = await JSON.parse(JSON.stringify(reservationsData));

        const data: { month: string; value: any }[] = [
          { month: "Jan", value: [] },
          { month: "Fev", value: [] },
          { month: "Mar", value: [] },
          { month: "Abr", value: [] },
          { month: "Mai", value: [] },
          { month: "Jun", value: [] },
          { month: "Jul", value: [] },
          { month: "Ago", value: [] },
          { month: "Set", value: [] },
          { month: "Out", value: [] },
          { month: "Nov", value: [] },
          { month: "Dez", value: [] },
        ];

        if (reservationsData) {
          reservationsData.forEach((reservation) => {
            if (
              new Date(reservation.dateTime).getFullYear() === now.getFullYear()
            )
              // eslint-disable-next-line
              data[new Date(reservation.dateTime).getMonth()]?.value.push(
                reservation
              );
          });
        }

        // eslint-disable-next-line
        data.forEach((entry) => (entry.value = entry.value.length));

        // eslint-disable-next-line
        admin = JSON.parse(JSON.stringify(admin));

        return {
          props: {
            admin,
            resCount,
            data,
          },
        };
      }
    }

    return { props: { notFound: true } };
  } catch (err) {
    return { props: { notFound: true } };
  }
};

export type FullAdmin = Prisma.AdminGetPayload<{
  include: {
    AdminConfig: true;
    ClosedDays: true;
    Day: true;
    Reservation: { include: { service: true } };
    Service: { include: { reservations: true } };
  };
}>;

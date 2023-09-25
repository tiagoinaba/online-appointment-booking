import AdminBackButton from "@/components/AdminBackButton";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { ServiceSelect } from "@/components/Select";
import { prisma } from "@/server/db";
import { now } from "@/utils/constants";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { FullAdmin } from ".";

export default function Financeiro({
  admin,
  resCount,
  chartData,
}: {
  admin: FullAdmin;
  resCount: number;
  chartData:
    | {
        month: string;
        value: any;
      }[];
}) {
  const [serviceRes, setServiceRes] = useState<string | null>(null);
  const [financeData, setFinanceData] = useState<typeof chartData | null>(null);

  useEffect(() => {
    const data = chartData.map((entry) => ({
      ...entry,
      value: entry.value * admin?.AdminConfig?.paymentValue!,
    }));
    setFinanceData(data);
  }, []);

  return (
    <main className="flex flex-col gap-8 py-20">
      {admin ? (
        <div className="flex flex-auto flex-col gap-8 px-10 lg:px-40">
          <Heading className="mx-0">Financeiro</Heading>

          <div className="flex flex-col flex-wrap gap-4 xl:flex-row">
            {admin.AdminConfig?.requirePayment && (
              <Card className="flex-1">
                <div className="flex h-full flex-col gap-4">
                  <Heading className="mx-0 text-xl">Faturamento</Heading>
                  <p className="text-2xl font-bold">
                    R$
                    {Math.round(
                      resCount * admin.AdminConfig.paymentValue
                    ).toFixed(2)}
                  </p>
                  {financeData && (
                    <ResponsiveContainer
                      className={"-mx-4 mt-auto"}
                      width={"100%"}
                      height={400}
                    >
                      <BarChart data={financeData} barGap={"50%"}>
                        <XAxis dataKey={"month"} />
                        <YAxis dataKey={"value"} />
                        <Bar dataKey={"value"} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>
            )}
            <Card className="flex-1">
              <div className="flex flex-col gap-4">
                <Heading className="mx-0 text-xl">Agendamentos</Heading>
                {admin.AdminConfig && admin.AdminConfig.multipleServices && (
                  <ServiceSelect
                    services={admin.Service}
                    onChange={(event) => {
                      setServiceRes(event ? event.value : null);
                    }}
                  />
                )}
                <p className="text-center text-lg">
                  {serviceRes
                    ? admin.Service.find((serv) => serv.name === serviceRes)
                        ?.reservations.length
                    : resCount}{" "}
                  reserva(s)
                </p>
                <ResponsiveContainer
                  className={"-mx-4"}
                  width={"100%"}
                  height={400}
                >
                  <BarChart data={chartData}>
                    <XAxis dataKey={"month"} />
                    <YAxis dataKey={"value"} />
                    <Bar dataKey={"value"} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div>Algo deu errado. Tente novamente.</div>
      )}
    </main>
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const adminName = req.cookies["admin-name"];
  let resCount = await prisma.reservation.count({
    where: {
      admin: {
        name: adminName,
      },
    },
  });

  resCount = JSON.parse(JSON.stringify(resCount));

  let admin = await prisma.admin.findFirst({
    where: { name: adminName },
    include: {
      AdminConfig: true,
      Service: { include: { reservations: true } },
    },
  });

  admin = JSON.parse(JSON.stringify(admin));

  let reservationsData = await prisma.reservation.findMany({
    where: { admin: { id: admin?.id } },
  });

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
      if (new Date(reservation.dateTime).getFullYear() === now.getFullYear())
        data[new Date(reservation.dateTime).getMonth()]?.value.push(
          reservation
        );
    });
  }

  data.forEach((entry) => (entry.value = entry.value.length));

  return {
    props: {
      reservations: resCount,
      admin,
      chartData: data,
    },
  };
};

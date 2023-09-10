import AdminBackButton from "@/components/AdminBackButton";
import Button from "@/components/Button";
import { WeekDays } from "@/components/WeekDays";
import DataTable from "@/components/reservations/DataTable";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { format, isEqual } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

export default function closedDays({
  admin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [day, setDay] = useState<Date | null>(now);

  const utils = api.useContext();

  const [highlightedDays, setHighlightedDays] = useState<Date[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);

  const { data: closedDays } = api.closedDay.getClosedDays.useQuery({
    adminId: admin?.id ?? null,
  });
  const { mutate: toggleClosedDay } = api.closedDay.toggleClosedDay.useMutation(
    {
      onSuccess: () => {
        utils.closedDay.invalidate();
      },
    }
  );
  const { data: reservations } = api.reservation.getByDateAdmin.useQuery({
    date: day,
    adminId: admin?.id ?? "",
  });

  useEffect(() => {
    if (closedDays && closedDays.length > 0)
      setHighlightedDays(closedDays?.map((day) => day.dateClosed));
  }, [closedDays]);

  return (
    admin && (
      <main className="flex flex-col items-center gap-4 py-20">
        <Head>
          <title>Admin - Calendário</title>
        </Head>
        <AdminBackButton />
        <h2 className="mx-40 w-auto self-start border-b text-4xl font-bold">
          Horários
        </h2>
        <div className="mt-5">
          <WeekDays adminId={admin.id} adminConfig={admin.AdminConfig!} />
        </div>
        <h2 className="mx-40 mt-10 w-auto self-start border-b text-4xl font-bold">
          Calendário
        </h2>
        <h2
          onAnimationEnd={() => setAnimate(false)}
          className={`mb-4 text-4xl font-bold ${animate && "animate-fadeIn"}`}
        >
          {day
            ? format(day, "dd 'de' MMMM", {
                locale: ptBR,
              })
            : "-- --, --:--"}
        </h2>
        <div className="flex">
          {highlightedDays && (
            <div className="flex flex-col items-center gap-6">
              <Calendar
                minDate={now}
                defaultValue={day}
                onClickDay={(date) => {
                  setAnimate(true);
                  date.setHours(0, 0, 0, 0);
                  setDay(date);
                }}
                locale="pt-BR"
                tileClassName={({ date }) => {
                  return highlightedDays.find((day) => isEqual(date, day))
                    ? "closedDay"
                    : "";
                }}
              />
              {day && (
                <Button
                  onClick={() =>
                    toggleClosedDay({
                      adminId: admin.id,
                      dateClosed: day,
                    })
                  }
                >
                  Abrir/Fechar
                </Button>
              )}
              {day && (
                <div className="text-center">
                  {reservations && (
                    <DataTable
                      services={admin.Service}
                      data={reservations?.map((res) => ({
                        id: res.id,
                        name: res.name,
                        email: res.email,
                        date: res.dateTime,
                        service: res.service?.name ? res.service?.name : null,
                        paymentIdMP: res.paymentIdMP,
                      }))}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    )
  );
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const adminName = req.cookies["admin-name"];
    let admin = await prisma.admin.findFirst({
      where: { name: adminName },
      include: {
        Service: true,
        AdminConfig: true,
      },
    });

    admin = JSON.parse(JSON.stringify(admin));

    return {
      props: {
        admin,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

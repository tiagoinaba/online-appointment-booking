import AdminBackButton from "@/components/AdminBackButton";
import Button from "@/components/Button";
import { WeekDays } from "@/components/WeekDays";
import DataTable from "@/components/reservations/DataTable";
import Select, { type StylesConfig } from "react-select";

import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { add, format, isBefore, isEqual } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { type FullAdmin } from ".";
import { type Service } from "@prisma/client";

const selectStyles = {
  container: (base) => ({
    ...base,
  }),
  control: (base) => ({
    // ...base,
    display: "flex",
    border: "1px solid rgba(0, 0, 0, .1)",
    padding: ".25rem",
    borderRadius: ".25rem",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "white",
    padding: ".25rem",
    border: "1px solid rgba(0, 0, 0, .1)",
    borderRadius: ".25rem",
  }),
  input: (base) => ({ ...base }),
  placeholder: (base) => ({ ...base, opacity: "50%" }),
  option: (base) => ({
    ...base,
    ":hover": { backgroundColor: "#e4e4e7" },
    borderRadius: ".25rem",
    padding: ".25rem .5rem",
  }),
} satisfies StylesConfig;

export default function Calendario({ admin }: { admin: FullAdmin }) {
  const [day, setDay] = useState<Date | null>(() => {
    const nowCopy = new Date(now);
    nowCopy.setHours(0, 0, 0, 0);
    return nowCopy;
  });
  const [service, setService] = useState<Service>();
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

  const utils = api.useContext();

  const [highlightedDays, setHighlightedDays] = useState<Date[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);

  const { mutate: toggleClosedDay } = api.closedDay.toggleClosedDay.useMutation(
    {
      onSuccess: async () => {
        await utils.closedDay.invalidate();
      },
    }
  );

  const { data: reservations } = api.reservation.getByDateAdmin.useQuery({
    date: day,
    adminId: admin?.id ?? "",
  });

  const { data: closedDays } = api.closedDay.getClosedDays.useQuery(
    { adminId: admin.id },
    {
      initialData: admin.ClosedDays,
    }
  );

  const getTimes = () => {
    const foundDay = admin.Day.find((kDay) => day!.getDay() === kDay.weekDay);

    if (foundDay) {
      const begin = add(day!, {
        hours: new Date(foundDay.openingHour).getHours(),
        minutes: new Date(foundDay.openingHour).getMinutes(),
      });
      const end = add(day!, {
        hours: new Date(foundDay.closingHour).getHours(),
        minutes: new Date(foundDay.closingHour).getMinutes(),
      });
      const increments = {
        hours: new Date(foundDay.interval).getHours(),
        minutes: new Date(foundDay.interval).getMinutes(),
      };

      const times = [];

      for (let i = begin; i < end; i = add(i, increments)) {
        times.push(i);
      }

      return times;
    }
    const begin = add(day!, {
      hours: admin.AdminConfig?.openingHours.getHours(),
      minutes: admin.AdminConfig?.openingHours.getMinutes(),
    });
    const end = add(day!, {
      hours: admin.AdminConfig?.closingHours.getHours(),
      minutes: admin.AdminConfig?.closingHours.getMinutes(),
    });
    const increments = {
      hours: admin.AdminConfig?.interval.getHours(),
      minutes: admin.AdminConfig?.interval.getMinutes(),
    };

    const times = [];

    for (let i = begin; i < end; i = add(i, increments)) {
      times.push(i);
    }

    return times;
  };

  useEffect(() => {
    if (closedDays && closedDays.length > 0)
      setHighlightedDays(closedDays?.map((day) => day.dateClosed));
  }, [closedDays]);

  return (
    admin && (
      <main className="flex flex-col items-center gap-4 py-20">
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
          className={`mb-4 text-4xl font-bold ${
            animate ? "animate-fadeIn" : ""
          }`}
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
              <div>
                <div className="flex flex-col gap-8">
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
                  {admin.AdminConfig?.multipleServices && (
                    <Select
                      instanceId={"teste"}
                      placeholder={"Escolha um serviço..."}
                      options={admin.Service?.map((service) => ({
                        label: service.name,
                        value: service,
                      }))}
                      onChange={(event) => setService(event?.value)}
                      styles={selectStyles}
                      isClearable
                      unstyled
                    />
                  )}
                  <div className="grid grid-cols-4 gap-8">
                    {day && service
                      ? getTimes().map((time) => (
                          <Button
                            key={time.toISOString()}
                            variant="ghost"
                            className={`${
                              isEqual(selectedHour!, time)
                                ? "border-2 border-zinc-500"
                                : ""
                            }`}
                            disabled={
                              (reservations?.find((res) => {
                                return admin.AdminConfig?.multipleServices
                                  ? isEqual(res.dateTime, time) &&
                                      res.service?.name === service.name
                                  : isEqual(res.dateTime, time);
                              })
                                ? true
                                : false) || isBefore(time, now)
                            }
                            onClick={() => {
                              setSelectedHour(time);
                            }}
                          >
                            {format(time, "kk:mm")}
                          </Button>
                        ))
                      : null}
                  </div>
                </div>
              </div>
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
                        paymentStatus: res.paymentStatus,
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

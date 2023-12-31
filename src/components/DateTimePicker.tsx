import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { type DateType } from "@/utils/types";
import { DateCalendar } from "@mui/x-date-pickers";
import { type Day } from "@prisma/client";
import { add, format, isBefore, isEqual } from "date-fns";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import Button from "./Button";

interface DateTimePickerProps {
  date: {
    justDate: Date | null;
    dateTime: Date | null;
  };
  setDate: Dispatch<SetStateAction<DateType>>;
  setAnimate: Dispatch<SetStateAction<boolean>>;
  adminId: string;
  opening: {
    openingHours: { hours: number; minutes?: number };
    closingHours: { hours: number; minutes?: number };
    interval: { hours?: number; minutes?: number };
  };
  serviceId?: string;
  days: Day[];
}

export default function DateTimePicker({
  date,
  setDate,
  setAnimate,
  adminId,
  opening,
  serviceId,
  days,
}: DateTimePickerProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  const { data: adminRes, refetch: refetchAdmin } =
    api.reservation.getByDateAdmin.useQuery({
      date: date.justDate,
      adminId,
    });

  const { data: serviceRes, refetch: refetchService } =
    api.reservation.getByDateService.useQuery({
      date: date.justDate,
      serviceId: serviceId ? serviceId : null,
    });

  const { data: closedDays } = api.closedDay.getClosedDays.useQuery({
    adminId,
  });

  useEffect(() => {
    if (adminId) void refetchAdmin();
    if (serviceId) void refetchService();
  }, [date.justDate]);

  const getTimes = () => {
    const foundDay = days.find(
      (day) => date.justDate?.getDay() === day.weekDay
    );

    if (foundDay) {
      const begin = add(date.justDate!, {
        hours: new Date(foundDay.openingHour).getHours(),
        minutes: new Date(foundDay.openingHour).getMinutes(),
      });
      const end = add(date.justDate!, {
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
    const begin = add(date.justDate!, opening.openingHours);
    const end = add(date.justDate!, opening.closingHours);
    const increments = opening.interval;

    const times = [];

    for (let i = begin; i < end; i = add(i, increments)) {
      times.push(i);
    }

    return times;
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <DateCalendar
          minDate={new Date()}
          onChange={(e) => {
            setAnimate(true);
            setDate({
              justDate: e,
              dateTime: null,
            });
          }}
          shouldDisableDate={(date) => {
            const foundDay = days.find((day) => date.getDay() === day.weekDay);

            return closedDays?.find((x) => isEqual(x.dateClosed, date)) ||
              (foundDay ? !foundDay.open : false)
              ? true
              : false;
          }}
        />
      )}
      {date.justDate && !serviceId ? (
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {getTimes().map((time) => (
            <Button
              key={time.toISOString()}
              disabled={
                (adminRes?.find((res) => isEqual(res.dateTime, time))
                  ? true
                  : false) || isBefore(time, now)
              }
              onClick={() => {
                setAnimate(true);
                setDate((prev) => ({
                  ...prev,
                  dateTime: time,
                }));
              }}
            >
              {format(time, "kk:mm")}
            </Button>
          ))}
        </div>
      ) : (
        date.justDate &&
        serviceId && (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {isBefore(
              now,
              new Date(
                date.justDate.getFullYear(),
                date.justDate.getMonth(),
                date.justDate.getDate(),
                opening.closingHours.hours,
                opening.closingHours.minutes
              )
            ) ? (
              getTimes().map((time) => (
                <Button
                  key={time.toISOString()}
                  variant="ghost"
                  className={`${
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    isEqual(date.dateTime!, time) && "border-2 border-zinc-500"
                  }`}
                  disabled={
                    (serviceRes?.find((res) => isEqual(res.dateTime, time))
                      ? true
                      : false) || isBefore(time, now)
                  }
                  onClick={() => {
                    setAnimate(true);
                    setDate((prev) => ({
                      ...prev,
                      dateTime: time,
                    }));
                  }}
                >
                  {format(time, "kk:mm")}
                </Button>
              ))
            ) : (
              <p className="col-span-2 md:col-span-4 md:text-lg">
                Não há mais horários disponíveis
              </p>
            )}
          </div>
        )
      )}
    </>
  );
}

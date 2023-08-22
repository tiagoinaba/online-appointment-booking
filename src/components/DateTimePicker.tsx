import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { DateType } from "@/utils/types";
import { Button } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { add, format, isBefore, isEqual } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
}

export default function DateTimePicker({
  date,
  setDate,
  setAnimate,
  adminId,
  opening,
  serviceId,
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
    if (adminId) refetchAdmin();
    if (serviceId) refetchService();
  }, [date.justDate]);

  const getTimes = () => {
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
          shouldDisableDate={(date) =>
            closedDays?.find((x) => isEqual(x.dateClosed, date)) ? true : false
          }
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
          <div className="grid grid-cols-4 gap-8">
            {getTimes().map((time) => (
              <Button
                key={time.toISOString()}
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
            ))}
          </div>
        )
      )}
    </>
  );
}

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
}

export default function DateTimePicker({
  date,
  setDate,
  setAnimate,
  adminId,
}: DateTimePickerProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  const { data, refetch } = api.reservation.getByDateAdmin.useQuery({
    date: date.justDate,
    adminId,
  });

  useEffect(() => {
    refetch();
  }, [date.justDate]);

  const getTimes = () => {
    const begin = add(date.justDate!, { hours: 9 });
    const end = add(date.justDate!, { hours: 17 });
    const increments = { minutes: 30 };

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
        />
      )}
      {date.justDate && (
        <div className="grid grid-cols-4 gap-8">
          {getTimes().map((time) => (
            <Button
              key={time.toISOString()}
              disabled={
                (data?.find((res) => isEqual(res.dateTime, time))
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
      )}
    </>
  );
}

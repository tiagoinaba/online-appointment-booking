import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { DateType } from "@/utils/types";
import { DateCalendar } from "@mui/x-date-pickers";
import { Day } from "@prisma/client";
import { add, format, isBefore, isEqual } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./Button";

interface DateTimeDemoProps {
  date: {
    justDate: Date | null;
    dateTime: Date | null;
  };
  setDate: Dispatch<SetStateAction<DateType>>;
  setAnimate: Dispatch<SetStateAction<boolean>>;
  opening: {
    openingHours: { hours: number; minutes?: number };
    closingHours: { hours: number; minutes?: number };
    interval: { hours?: number; minutes?: number };
  };
  reserved: Date[];
}

export default function DateTimeDemo({
  date,
  setDate,
  setAnimate,
  opening,
  reserved,
}: DateTimeDemoProps) {
  const [domLoaded, setDomLoaded] = useState(false);

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
        />
      )}

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {getTimes().map((time) => (
          <Button
            key={time.toISOString()}
            variant="ghost"
            className={`${
              isEqual(date.dateTime!, time) && "border-2 border-zinc-500"
            }`}
            disabled={
              (reserved?.find((res) => isEqual(res, time)) ? true : false) ||
              isBefore(time, now)
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
    </>
  );
}

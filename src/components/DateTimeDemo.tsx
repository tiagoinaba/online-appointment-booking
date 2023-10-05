import { now } from "@/utils/constants";
import { type DateType } from "@/utils/types";
import { DateCalendar } from "@mui/x-date-pickers";
import { add, format, isBefore, isEqual } from "date-fns";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
        {date.justDate &&
        isBefore(
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
                isEqual(date.dateTime!, time) ? "border-2 border-zinc-500" : ""
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
          ))
        ) : (
          <p className="col-span-2 md:col-span-4">
            Não há mais horários disponíveis
          </p>
        )}
      </div>
    </>
  );
}

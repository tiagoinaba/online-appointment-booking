import React, { useState } from "react";
import Button from "./Button";
import DateTimePicker from "./DateTimePicker";
import DateTimeDemo from "./DateTimeDemo";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import toast from "react-hot-toast";

export default function DateTimePickerDemo() {
  const [date, setDate] = useState<{
    justDate: Date | null;
    dateTime: Date | null;
  }>({ justDate: null, dateTime: null });
  const [animate, setAnimate] = useState<boolean>(true);
  const [reserved, setReserved] = useState<Date[]>([]);
  return (
    <div
      className={`relative flex flex-col items-center justify-center
              rounded-3xl p-8 transition duration-300 lg:border lg:bg-white`}
    >
      <h2
        onAnimationEnd={() => setAnimate(false)}
        className={`text-2xl font-bold md:text-4xl ${
          animate && "animate-fadeIn"
        }`}
      >
        {date.dateTime
          ? format(date.dateTime, "dd 'de' MMMM, kk:mm", {
              locale: ptBR,
            })
          : date.justDate
          ? format(date.justDate, "dd 'de' MMMM, --:--", {
              locale: ptBR,
            })
          : "-- --, --:--"}
      </h2>
      <DateTimeDemo
        date={date}
        reserved={reserved}
        setAnimate={setAnimate}
        setDate={setDate}
        opening={{
          openingHours: {
            hours: 9,
          },
          closingHours: {
            hours: 17,
          },
          interval: {
            hours: 0,
            minutes: 30,
          },
        }}
      />
      <Button
        className="mt-8"
        disabled={!date.dateTime}
        onClick={() => {
          toast.success("Horário reservado com sucesso!");
          setReserved((prev) => {
            const res = [...prev];
            res.push(date.dateTime!);
            return res;
          });
          setDate((prev) => ({ ...prev, dateTime: null }));
        }}
      >
        Reservar
      </Button>
    </div>
  );
}

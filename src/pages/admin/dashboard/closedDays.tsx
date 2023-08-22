import Button from "@/components/Button";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { now } from "@/utils/constants";
import { add, format, isEqual } from "date-fns";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "@/components/styles/ClosedDays.module.css";

export default function closedDays({
  admin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [day, setDay] = useState<Date | null>(null);

  const utils = api.useContext();

  const [highlightedDays, setHighlightedDays] = useState<Date[]>([]);

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

  useEffect(() => {
    if (closedDays && closedDays.length > 0)
      setHighlightedDays(closedDays?.map((day) => day.dateClosed));
  }, [closedDays]);

  return (
    admin && (
      <main className="flex h-screen w-screen flex-col items-center justify-around">
        {day && (
          <Button
            onClick={() =>
              toggleClosedDay({
                adminId: admin.id,
                dateClosed: day,
              })
            }
          >
            Close day
          </Button>
        )}
        <div>{day && format(day, "dd/MM/yyyy")}</div>
        <div className="flex">
          {highlightedDays && (
            <Calendar
              minDate={now}
              onClickDay={(date) => {
                date.setHours(0, 0, 0, 0);
                setDay(date);
              }}
              locale="pt-BR"
              tileContent={({ date, view }) => {
                return (
                  <span className="h-4 w-4 rounded-full bg-red-500"></span>
                );
              }}
              tileClassName={({ date }) => {
                return highlightedDays.find((day) => isEqual(date, day))
                  ? styles.closedDay
                  : "";
              }}
            />
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
      select: { id: true },
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

import Button from "@/components/Button";
import { Heading } from "@/components/Heading";
import DataTable, {
  ReservationTable,
} from "@/components/reservations/DataTable";
import { Prisma, Reservation, Service } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

export default function Reservations({
  reservations,
  services,
  adminId,
}: {
  reservations: Prisma.ReservationGetPayload<{ include: { service: true } }>[];
  services: Service[];
  adminId: string;
}) {
  const [formattedRes, setFormattedRes] = useState<ReservationTable[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<Partial<Reservation>>();

  useEffect(() => {
    if (reservations && reservations.length > 0) {
      setFormattedRes(
        reservations?.map((res) => ({
          id: res.id,
          name: res.name,
          email: res.email,
          date: res.dateTime,
          service: res.service?.name ? res.service?.name : null,
          paymentIdMP: res.paymentIdMP,
          paymentStatus: res.paymentStatus,
        }))
      );
    }
  }, [reservations]);

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center pt-32">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <Heading className="mx-0">Reservas</Heading>
            <Button variant="default">Criar reserva</Button>
          </div>
          {formattedRes && (
            <div className="mx-auto py-10">
              <DataTable services={services} data={formattedRes} />
            </div>
          )}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}

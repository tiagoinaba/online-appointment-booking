import { api } from "@/utils/api";
import { AdminInfo, Inputs } from "@/utils/types";
import { Button } from "@mui/material";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
  const [dateReserved, setDateReserved] = useState<Date | null>(null);
  const [reservationData, setReservationData] = useState<Inputs | null>(null);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

  const {
    mutate: getPayment,
    data: paymentData,
    isLoading: paymentLoading,
  } = api.mercadopago.getPayment.useMutation();
  const {
    mutate: createReservation,
    data: reservationResponse,
    isLoading: reservationLoading,
  } = api.reservation.createReservation.useMutation({
    onSuccess: () => {
      localStorage.clear();
    },
  });

  const router = useRouter();
  const { status, payment_id: paymentId } = router.query;
  const isApproved = status === "approved";

  useEffect(() => {
    const data = localStorage.getItem("reservationInfo");
    const adminInfo = localStorage.getItem("adminInfo");
    if (data) {
      setReservationData(JSON.parse(data));
    }
    if (adminInfo) {
      setAdminInfo(JSON.parse(adminInfo));
    }
  }, []);

  useEffect(() => {
    if (typeof paymentId === "string") {
      if (paymentData && reservationData) {
        const { name, email } = reservationData;
        const description = JSON.parse(
          paymentData.additional_info.items[0].description
        );
        const dateString = description.date;
        const adminId = description.adminId;
        const serviceId = description.serviceId;
        console.log(description);
        const date = parseISO(dateString);
        createReservation({
          date,
          name,
          email,
          paymentId: paymentId,
          adminId,
          serviceId,
        });
        setDateReserved(date);
        return;
      }
      if (status === "approved" && paymentId.length > 0) {
        getPayment({ paymentId });
      }
    }
  }, [paymentData]);

  return (
    <main className="relative flex h-screen items-center justify-center text-center">
      {adminInfo && (
        <Button
          href={`/${adminInfo.route!}`}
          sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        >
          Voltar para o início
        </Button>
      )}
      {paymentLoading || reservationLoading ? (
        <h1 className="text-3xl">Loading...</h1>
      ) : (
        <div>
          <h1 className="text-3xl">{reservationResponse}</h1>
          {dateReserved && reservationData && (
            <p className="mt-4 text-2xl font-bold">
              {format(dateReserved, "dd/MM/yyyy '->' HH:mm")} -{" "}
              {reservationData.name}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
